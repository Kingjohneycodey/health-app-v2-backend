import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
    // title: string;
    // description: string;
    // completed: boolean;
    // userId: string;
    fullName: string;
}

const patientSchema: Schema = new Schema({
    fullName: { type: String, required: true },
});

export const Patient = mongoose.model<IPatient>('Patient', patientSchema);
