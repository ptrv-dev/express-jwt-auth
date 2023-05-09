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
    res.cookie('refreshToken', response.refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
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
    res.cookie('refreshToken', response.refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokens = await UserService.refresh(req.cookies.refreshToken);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.getUser(req.user._id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserService.logout(req.cookies.refreshToken);
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};
