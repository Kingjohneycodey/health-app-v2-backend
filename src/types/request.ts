import { Request } from 'express';
import { IUser } from '../models/User';

export interface AuthRequest extends Request {
    user?: IUser;
}


export interface AuthResponse extends Response {
    user?: IUser;
}

