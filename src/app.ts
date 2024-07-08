import express from 'express';
import { authRouter } from './routes/authRoutes';
import { taskRouter } from './routes/taskRoutes';
import { appErrorHandler, errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', taskRouter);

app.use(errorHandler);

export default app;
