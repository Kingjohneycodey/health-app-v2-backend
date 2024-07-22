import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { createPatient, findPatientByEmail } from '../repositories/patientAuthRepository';
import { IPatient } from '../models/Patient';
import { MESSAGES } from '../constants';
import { CustomError } from '../middleware/errorHandler';
import { AuthRequest } from '../types/request';
import { Response } from 'express';

export const registerPatient = async (username: string, email: string, password: string) => {
    const existingPatient = await findPatientByEmail(email);
    if (existingPatient) {
        const error = new Error('Email already in use') as CustomError;
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const patient = await createPatient({ username, email, password: hashedPassword });
    const token = jwt.sign({ _id: patient._id }, config.jwtSecret);
    return { patient, token };
};

export const loginPatient = async (email: string, password: string) => {
    const patient = await findPatientByEmail(email);
    if (!patient) {
        const error = new Error('Invalid login credentials') as CustomError;
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
        const error = new Error('Invalid login credentials') as CustomError;
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({ _id: patient._id }, config.jwtSecret);
    return { patient, token };
};


export const checkPatient = (req: AuthRequest, res: Response) => {
    if (!req.patient) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
}