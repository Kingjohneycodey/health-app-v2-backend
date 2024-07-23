import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface IPatient2 extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
}

const patientSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'doctor' }
});

export const Patient = mongoose.model<(IPatient2)>('Patient', patientSchema);
