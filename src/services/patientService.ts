import { createPatient, findPatients } from '../repositories/patientRepository';
import { IPatient } from '../models/Patient';

export const createpatient = (patientData: Partial<IPatient>, doctorId: string) => {
    return createPatient({ ...patientData, doctorId});
};

export const getPatients = () => {
    return findPatients();
};