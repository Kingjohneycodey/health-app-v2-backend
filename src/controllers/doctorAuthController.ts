import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Doctor } from "../models/Doctor"
import { registerDoctor, loginDoctor, sendPasswordResetEmail } from '../services/doctorAuthService';
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


export const forgotPassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate and save reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        doctor.resetPasswordToken = resetToken;
        doctor.resetPasswordExpires = new Date(Date.now() + 3600000); // Token expires in 1 hour

        await doctor.save();

        // Send email with reset token
        const resetURL = `http://${req.headers.host}/api/doctor/reset-password?token=${resetToken}`;
        await sendPasswordResetEmail(doctor.email, resetURL);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const confirmToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { token } = req.params;

    console.log(token)

    try {
        const doctor = await Doctor.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });

        if (!doctor) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        console.log("Token Confirmed")
        res.status(200).json({ status: true, message: 'Token Confirmed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

};

export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const doctor = await Doctor.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });

        if (!doctor) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Set new password
    const hashedPassword = await bcrypt.hash(newPassword, 8);

        doctor.password = hashedPassword;
        doctor.resetPasswordToken = undefined;
        doctor.resetPasswordExpires = undefined;

        await doctor.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};