import { NextFunction, Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const response = await UserService.registration(username, email, password);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const response = await UserService.login(email, password);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
