import { NextFunction, Request, Response } from 'express';
import { registerDoctor, loginDoctor } from '../services/doctorAuthService';
import { AuthRequest } from '../types/request';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const { doctor, token } = await registerDoctor(username, email, password);
        res.status(201).send({ doctor, token });
    } catch (error) {

        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { doctor, token } = await loginDoctor(email, password);
        res.send({ doctor, token });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        res.send(req.doctor);
    } catch (error) {
        next(error);
    }
};
