import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: string;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string) as { userId: string };
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
