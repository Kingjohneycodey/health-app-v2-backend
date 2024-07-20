import { Request, Response } from 'express';
import { createpatient as createPatient, getPatients } from '../services/patientService';
import { AuthRequest } from '../types/request';

export const create = async (req: AuthRequest, res: Response) => {
     try {
        const patient = await createPatient(req.body);
        res.status(201).send(patient);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};



export const getAll = async (req: AuthRequest, res: Response) => {
  try {
        const tasks = await getPatients();
        res.send(tasks);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};
