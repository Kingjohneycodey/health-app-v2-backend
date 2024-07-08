import { NextFunction, Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';
import { AuthRequest } from '../types/request';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const { user, token } = await registerUser(username, email, password);
        res.status(201).send({ user, token });
    } catch (error) {

        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);
        res.send({ user, token });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        res.send(req.user);
    } catch (error) {
        next(error);
    }
};
