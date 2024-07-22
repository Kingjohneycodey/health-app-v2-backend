import { Request } from 'express';
import { IUser } from '../models/User';
import { IPatient } from '../models/Patient';
import { IDoctor } from '../models/Doctor';


export interface AuthRequest extends Request {
    user?: IUser;
    patient?: IPatient;
    doctor?: IDoctor;

}


export interface AuthResponse extends Response {
    user?: IUser;
    patient?: IPatient;
    doctor?: IDoctor;
}

