import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Household from '../models/Household';
import generateToken from '../utils/generateToken';

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const household = await Household.create({ name: `${username}'s Household` });

    user = new User({
      username,
      email,
      password: hashedPassword,
      household: household._id,
    });
    await user.save();

    await Household.findByIdAndUpdate(household._id, {
      $push: { members: user._id },
    });

    const token = generateToken(user._id.toString());

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
    const user = await User.findOne({ email }).populate('household');
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const token = generateToken(user._id.toString());

    res.json({ token, user });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send(':( Server Error');
  }
};