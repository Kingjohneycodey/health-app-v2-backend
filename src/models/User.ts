import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface IUser2 extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});

export const User = mongoose.model<IUser2>('User', userSchema);
