import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from '../repositories/userRepository';
import { AuthRequest } from '../types/request';
import config from '../config';
import { MESSAGES } from '../constants';
import { IUser } from '../models/User';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: MESSAGES.UNAUTHORIZED });
    }

    try {
        const decoded: any = jwt.verify(token, config.jwtSecret);
        const user = await findUserById(decoded._id);

        
        if (!user) {
            return res.status(401).send({ error: 'Authentication required' });
        }

        req.user = user as IUser;
        next();
    } catch (error) {
        res.status(401).send({ error: MESSAGES.UNAUTHORIZED });
    }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).send({ error: MESSAGES.ACCESS_DENIED });
    }
    next();
};
