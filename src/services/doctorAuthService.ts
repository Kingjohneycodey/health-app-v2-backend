import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import { createDoctor, findDoctorByEmail } from '../repositories/doctorAuthRepository';
import { IDoctor } from '../models/Doctor';
import { MESSAGES } from '../constants';
import { CustomError } from '../middleware/errorHandler';
import { AuthRequest } from '../types/request';
import { Response } from 'express';
import sendEmail from '../utils/sendMail';

export const registerDoctor = async (username: string, email: string, password: string) => {
    const existingDoctor = await findDoctorByEmail(email);
    if (existingDoctor) {
        const error = new Error('Email already in use') as CustomError;
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const doctor = await createDoctor({ username, email, password: hashedPassword });
    const token = jwt.sign({ _id: doctor._id }, config.jwtSecret);
    return { doctor, token };
};

export const loginDoctor = async (email: string, password: string) => {
    const doctor = await findDoctorByEmail(email);
    if (!doctor) {
        const error = new Error('Invalid login credentials') as CustomError;
        error.status = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
        const error = new Error('Invalid login credentials') as CustomError;
        error.status = 401;
        throw error;
    }

    const token = jwt.sign({ _id: doctor._id }, config.jwtSecret);
    return { doctor, token };
};

export const sendPasswordResetEmail =async (email: string, resetURL: string) => {
    sendEmail(email, resetURL, resetURL)
    // Implement your email sending logic here (using nodemailer or any other email service)
  }


export const checkDoctor = (req: AuthRequest, res: Response) => {
    if (!req.doctor) {
        return res.status(400).send({ error: 'User not authenticated' });
    }
}