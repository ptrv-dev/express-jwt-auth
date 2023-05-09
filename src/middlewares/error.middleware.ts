import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err instanceof Error);
  console.log(err instanceof ApiError);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }
  return res.status(500).json({ message: 'Unexpected error!', errors: [] });
};
