import { createPatient, findPatients } from '../repositories/patientRepository';
import { IPatient } from '../models/Patient';

export const createpatient = (patientData: Partial<IPatient>) => {
    return createPatient({ ...patientData });
};

export const getPatients = () => {
    return findPatients();
};