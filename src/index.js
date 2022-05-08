import dotenv from 'dotenv';
import express, { urlencoded, json } from 'express';
import apiRouter from './router.js';

dotenv.config();

const port = process.env.PORT ?? 4000;

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
