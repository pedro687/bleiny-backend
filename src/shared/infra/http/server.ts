import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import Router from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const port = 3333 || process.env.port;

app.use(express.json());

app.use(Router);

app.use(cors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.log(err);

  return res.status(500).json({
    error: 500,
    message: 'Internal server error!',
  });
});

app.listen(port, () => {
  console.log(` Server running at ${port} `);
})
