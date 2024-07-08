import { Task, ITask } from '../models/Task';

export const createTask = (taskData: Partial<ITask>) => {
    const task = new Task(taskData);
    return task.save();
};

export const findTasksByUserId = (userId: string) => {
    return Task.find({ userId });
};

export const findTaskById = (id: string) => {
    return Task.findById(id);
};

export const updateTaskById = (id: string, updates: Partial<ITask>) => {
    return Task.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteTaskById = (id: string) => {
    return Task.findByIdAndDelete(id);
};
