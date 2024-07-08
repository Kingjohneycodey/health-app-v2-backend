import { Request, Response } from 'express';
import { createATask, getTasks, getTask, updateTask, deleteTask } from '../services/taskService';
import { AuthRequest } from '../types/request';

export const create = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }

    try {
        const task = await createATask(req.body, req.user._id);
        res.status(201).send(task);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};

export const getAll = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }

    try {
        const tasks = await getTasks(req.user._id);
        res.send(tasks);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};

export const getOne = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }

    try {
        const task = await getTask(req.params.id, req.user._id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};

export const update = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }

    try {
        const task = await updateTask(req.params.id, req.body, req.user._id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};

export const remove = async (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(400).send({ error: 'User not authenticated' });
    }

    try {
        const task = await deleteTask(req.params.id, req.user._id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
};
