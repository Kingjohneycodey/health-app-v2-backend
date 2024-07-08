import { createTask, findTasksByUserId, findTaskById, updateTaskById, deleteTaskById } from '../repositories/taskRepository';
import { ITask } from '../models/Task';

export const createATask = (taskData: Partial<ITask>, userId: string) => {
    return createTask({ ...taskData, userId });
};

export const getTasks = (userId: string) => {
    return findTasksByUserId(userId);
};

export const getTask = (taskId: string, userId: string) => {
    return findTaskById(taskId).then(task => (task?.userId === userId ? task : null));
};

export const updateTask = (taskId: string, updates: Partial<ITask>, userId: string) => {
    return findTaskById(taskId).then(task => {
        if (task?.userId !== userId) {
            return null;
        }
        return updateTaskById(taskId, updates);
    });
};

export const deleteTask = (taskId: string, userId: string) => {
    return findTaskById(taskId).then(task => {
        if (task?.userId !== userId) {
            return null;
        }
        return deleteTaskById(taskId);
    });
};
