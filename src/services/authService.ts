import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { createUser, findUserByEmail } from '../repositories/userRepository';
import { IUser } from '../models/User';
import { MESSAGES } from '../constants';
import { CustomError } from '../middleware/errorHandler';
import { AuthRequest } from '../types/request';
import { Response } from 'express';

export const registerUser = async (username: string, email: string, password: string) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        const error = new Error('Email already in use') as CustomError;
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await createUser({ username, email, password: hashedPassword });
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    return { user, token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);
    if (!user) {
        const error = new Error('Invalid login credentials') as CustomError;
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error('Invalid login credentials') as CustomError;
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    return { user, token };
};


export const checkUser = (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
}