import { Request } from 'express';
import { IUser } from '../models/User';
import { IDoctor } from '../models/Doctor';


export interface AuthRequest extends Request {
    user?: IUser;
    doctor?: IDoctor;

}


export interface AuthResponse extends Response {
    user?: IUser;
    doctor?: IDoctor;
}

