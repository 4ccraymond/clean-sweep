import jwt from "jsonwebtoken";
import { Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'Clean-sweep';
const expiration = '1h';

interface AuthUser {
    email: string;
    userName?: string;
}

export interface AuthContext {
    user: AuthUser | null;
}

export function signToken(user: AuthUser) {
    return jwt.sign({ data: user }, secret, {expiresIn: expiration});
}

export function authMiddleware({ req }: { req: Request }): AuthContext {
    let token = req.headers.authorization || ''; 

    if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

    if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token, secret) as {data: AuthUser};
    
    return { user: decoded.data };
  } catch (error) {
    
    console.error('Invalid Token:', error);
    return { user: null };
  }
}