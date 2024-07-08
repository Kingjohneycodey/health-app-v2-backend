import { Router } from 'express';
import { create, getAll, getOne, update, remove } from '../controllers/taskController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/tasks', authenticate, create);
router.get('/tasks', authenticate, getAll);
router.get('/tasks/:id', authenticate, getOne);
router.patch('/tasks/:id', authenticate, update);
router.delete('/tasks/:id', authenticate, remove);

export { router as taskRouter };
