import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import router from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

const PORT = process.env.PORT || 4444;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(errorMiddleware);

const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Successfully: Server started ${PORT}`);
    });
    mongoose
      .connect(process.env.MONGO_URI || '')
      .then(() => console.log('Successfully: Database connection established'));
  } catch (error) {
    console.log('Error: Server start error!\n', error);
  }
};

start();
