import jwt from "jsonwebtoken";
import { Request } from 'express';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const secret = process.env.JWT_SECRET || 'Clean-sweep';
const expiration = '1h';

export interface AuthUser {
    email: string;
    userName?: string;
    household?: string;
}

export interface AuthContext {
    user: AuthUser | null;
}

export function signToken(user: {
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
    { expiresIn: expiration }
  );
}

export async function authMiddleware({ req }: { req: Request }): Promise<AuthContext> {
  let token = req.headers.authorization || ''; 

  if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      email: string;
      username?: string;
      household?: string;
    };

    if (!decoded.email || !decoded.userId) {
      console.error('Invalid token format:', decoded);
      return { user: null };
    }

    return {
      user: {
        email: decoded.email,
        userName: decoded.username,
        household: decoded.household,
      },
    };

  } catch (error) {
    console.error('Invalid token:', error);
    return { user: null };
  }
}