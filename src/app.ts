import express from 'express';
import { authRouter } from './routes/authRoutes';
import { taskRouter } from './routes/taskRoutes';
import { patientRouter } from './routes/patientRoutes'
import { appErrorHandler, errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

// Define a route for the home URL
app.get('/', (req, res) => {
    res.send('Welcome to health app api!');
  });

app.use('/api/auth', authRouter);
app.use('/api', taskRouter);
app.use("/api", patientRouter)

app.use(errorHandler);

export default app;
