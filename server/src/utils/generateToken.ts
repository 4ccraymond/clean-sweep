import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'Clean-sweep';

export default function generateToken(user: {
  _id: string;
  email: string;
  username?: string;
  household?: string;
}) {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
      household: user.household,
    },
    secret,
    { expiresIn: '7d' }
  );
}