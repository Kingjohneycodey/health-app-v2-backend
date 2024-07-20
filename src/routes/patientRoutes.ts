import { Router } from 'express';
import { create, getAll } from '../controllers/patientController';

const router = Router();

router.post('/patient', create);
router.get('/patients', getAll);


export { router as patientRouter };
