import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 4444;

const app = express();

app.use(express.json());

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
