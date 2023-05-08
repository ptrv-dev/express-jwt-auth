import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const registration = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const response = await UserService.registration(username, email, password);
    return res.status(200).json(response);
  } catch (error) {
    if (!(error instanceof Error)) return;
    console.error('Error: User registration error!\n', error);
    return res
      .status(500)
      .json({ error: 'User registration error', message: error.message });
  }
};
