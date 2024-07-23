import { Router, Request, Response } from 'express';
import { register, login, getProfile,forgotPassword, confirmToken, changePassword } from '../controllers/doctorAuthController';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types/request';

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/forgot-password', forgotPassword)

// router.post ('/confirm-token/:token', confirmToken)

router.post ('/change-password/:token', changePassword)

router.get('/me', authenticate, getProfile);

export { router as doctorRouter };
 