import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';

import * as TokenService from '../services/token.service';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return next(ApiError.Unauthorized());
  const accessToken = req.headers.authorization.split(' ')[1]; // Bearer token
  if (!accessToken) return next(ApiError.Unauthorized());
  const payload = TokenService.validateAccessToken(accessToken);
  if (!payload) return next(ApiError.Unauthorized());
  req.user = { _id: payload._id };
  next();
};
