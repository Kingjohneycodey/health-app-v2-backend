import { Request, Response, NextFunction } from 'express';

export const appErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({ error: 'An unexpected error occurred.' });
};

import logger from '../utils/logger';

export interface CustomError extends Error {
    status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err.status) {
        res.status(err.status).send({ error: err.message });
    } else {
        logger.error('Unexpected error:', err);
        res.status(500).send({ error: 'An unexpected error occurred.' });
    }
};
