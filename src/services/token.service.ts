import jwt from 'jsonwebtoken';
import { TokenModel } from '../models/token.model';
import { ObjectId } from 'mongodb';

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
