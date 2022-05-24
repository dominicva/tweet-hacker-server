import dotenv from 'dotenv';
import express, { urlencoded, json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './router.js';
// import mockData from '../mockData.js';

dotenv.config();

const port = process.env.PORT ?? 4000;

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', apiRouter);
// app.get('/api/tweets/*', (_req, res) => {
//   res.json(mockData);
// });

app.listen(port, () => console.log(`Server listening on port ${port}`));
