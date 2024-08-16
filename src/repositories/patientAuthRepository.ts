import { Patient, IPatient } from '../models/Patient';

export const findPatientByEmail = (email: string) => {
    return Patient.findOne({ email });
};

export const findPatientById = (id: string) => {
    return Patient.findById(id);
};

export const createPatient = (userData: Partial<IPatient>) => {
    const patient = new Patient(userData);
    return patient.save();
};
