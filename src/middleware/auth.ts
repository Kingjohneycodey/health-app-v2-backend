import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findDoctorById } from '../repositories/doctorAuthRepository';
import { AuthRequest } from '../types/request';
import config from '../config';
import { MESSAGES } from '../constants';
import { IDoctor } from '../models/Doctor';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: MESSAGES.UNAUTHORIZED });
    }

    try {
        const decoded: any = jwt.verify(token, config.jwtSecret);
        const doctor = await findDoctorById(decoded._id);

        
        if (!doctor) {
            return res.status(401).send({ error: 'Authentication required' });
        }

        req.doctor = doctor as IDoctor;
        next();
    } catch (error) {
        res.status(401).send({ error: MESSAGES.UNAUTHORIZED });
    }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.doctor?.role !== 'doctor') {
        return res.status(403).send({ error: MESSAGES.ACCESS_DENIED });
    }
    next();
};
