import jwt from "jsonwebtoken";
import { Request } from 'express';
import dotenv from 'dotenv';
import User from '../models/User';

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

export async function authMiddleware({ req }: { req: Request }): Promise<AuthContext> {
    let token = req.headers.authorization || ''; 

    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    if (!token) {
        return { user: null };
    }

    try {
        const decoded = jwt.verify(token, secret) as { data: AuthUser };
        
        const user = await User.findOne({ email: decoded.data.email }).lean();

        if (!user) return { user: null };
        return { user: { email: user.email || '', userName: user.username } };
    
    } catch (error) {
        console.error('Invalid token:', error);
        return { user: null };
    }
}