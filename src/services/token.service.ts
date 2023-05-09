import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import { TokenModel } from '../models/token.model';

export const generateTokens = (
  payload: String | Object
): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || '', {
    expiresIn: '14d',
  });
  return { accessToken, refreshToken };
};

export const saveToken = async (userId: string | ObjectId, token: string) => {
  const tokenData = await TokenModel.findOne({ userId });
  if (tokenData) {
    tokenData.token = token;
    return await tokenData.save();
  }
  return await TokenModel.create({ userId, token });
};

export const validateAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? '') as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET ?? ''
    ) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const getTokenFromDB = async (token: string) => {
  return await TokenModel.findOne({ token });
};

export const removeToken = async (token: string) => {
  return await TokenModel.findOneAndDelete({ token });
};
