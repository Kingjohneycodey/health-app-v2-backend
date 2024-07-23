import express from 'express';
import { authRouter } from './routes/authRoutes';
import { taskRouter } from './routes/taskRoutes';
import { patientRouter } from './routes/patientRoutes'
import  { doctorRouter } from "./routes/doctorRoutes"
import { appErrorHandler, errorHandler } from './middleware/errorHandler';

import sendEmail from './utils/sendMail';
import { send } from 'process';

const app = express();

app.use(express.json());

// Define a route for the home URL
app.get('/', (req, res) => {
    res.send('Welcome to health app api!');
  });

app.get("/sendMailTest",  async(req, res) => {
  const sendEmailSuc = await sendEmail("numterminal@gmail.com", "Test", "<i>Testing Route</i>")
  if (sendEmailSuc) {
    res.send("Succesful")
  }
  
})

app.use('/api/auth', authRouter)
app.use('/api', taskRouter);
app.use("/api/patient", patientRouter)
app.use("/api/doctor", doctorRouter)

app.use(errorHandler);

export default app;
