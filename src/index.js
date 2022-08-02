import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import linksRouter from './routes/linksRouter.js';
import usersRouter from './routes/usersRouter.js';
import rankingRouter from './routes/rankingRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(linksRouter);
app.use(usersRouter);
app.use(rankingRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));