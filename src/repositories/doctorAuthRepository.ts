import { Doctor, IDoctor } from '../models/Doctor';

export const findDoctorByEmail = (email: string) => {
    return Doctor.findOne({ email });
};

export const findDoctorById = (id: string) => {
    return Doctor.findById(id);
};

export const createDoctor = (userData: Partial<IDoctor>) => {
    const doctor = new Doctor(userData);
    return doctor.save();
};
