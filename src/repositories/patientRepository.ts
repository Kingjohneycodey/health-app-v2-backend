import { Patient, IPatient } from '../models/Patient';

export const createPatient = (taskData: Partial<IPatient>) => {
    const patient = new Patient(taskData);
    return patient.save();
};

export const findPatients = () => {
    return Patient.find();
};

