import express, { Application } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user/user.routes';

const app: Application = express();

// parsers
app.use(cors());
app.use(express.json());

// router configuration
app.use('/api/users', userRouter);

export default app;
