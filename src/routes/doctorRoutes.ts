import { Router, Request, Response } from 'express';
import { register, login, getProfile } from '../controllers/doctorAuthController';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types/request';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get('/me', authenticate, getProfile);

export { router as doctorRouter };
