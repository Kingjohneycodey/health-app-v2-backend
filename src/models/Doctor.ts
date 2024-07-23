import mongoose, { Schema, Document } from 'mongoose';

export interface IDoctor extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    role: string;
}

export interface IDoctor2 extends Document {
    username: string;
    email: string;
    password: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    role: string;
}

const doctorSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, default: 'doctor' }
});

export const Doctor = mongoose.model<IDoctor2>('Doctor', doctorSchema);
