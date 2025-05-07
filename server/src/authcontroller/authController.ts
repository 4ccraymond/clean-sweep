import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Household from '../models/Household';
import generateToken from '../utils/generateToken';

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log('Received password:', password, '| Length:', password.length);

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password:', hashedPassword);

    const household = await Household.create({ name: `${username}'s Household` });

    user = new User({
      username,
      email,
      password,
      household: household._id,
    });
    await user.save();
    console.log('User created:', user);

    await Household.findByIdAndUpdate(household._id, {
      $push: { members: user._id },
    });

    const token = generateToken({
      _id: user._id.toString(),
      email: user.email!,
      username: user.username,
      household: user.household?._id?.toString?.() || user.household?.toString?.(),
    });

    const fullUser = await User.findById(user._id).populate('household');

    res.status(201).json({ token, user: fullUser });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send('Oh No! Server Error');
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt', req.body);

    const user = await User.findOne({ email }).populate('household');
    if (!user) {
      console.log('No user found for email:', email);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match for user:', user.email);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const token = generateToken({
      _id: user._id.toString(),
      email: user.email!,
      username: user.username,
      household: user.household?._id?.toString?.() || user.household?.toString?.(),
    });

    res.json({ token, user });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send(':( Server Error');
  }
};
