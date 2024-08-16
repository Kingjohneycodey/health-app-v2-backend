import { NextFunction, Request, Response } from 'express';
import { registerPatient, loginPatient } from '../services/patientAuthService';
import { AuthRequest } from '../types/request';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const { patient, token } = await registerPatient(username, email, password);
        res.status(201).send({ patient, token });
    } catch (error) {

        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { patient, token } = await loginPatient(email, password);
        res.send({ patient, token });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        res.send(req.patient);
    } catch (error) {
        next(error);
    }
};
