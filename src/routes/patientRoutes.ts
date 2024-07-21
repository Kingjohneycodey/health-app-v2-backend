import { Router } from 'express';
import { create, getAll } from '../controllers/patientController';
import { AuthRequest } from '../types/request';
import { authenticate } from '../middleware/auth';


const router = Router();

router.post('/create', authenticate ,create);
router.get('/patients', authenticate ,getAll);


export { router as patientRouter };
