import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    userId: string;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
