import bcrypt from 'bcrypt';

import ApiError from '../exceptions/api.error';
import * as TokenService from './token.service';
import { UserModel } from '../models/user.model';

export const registration = async (
  username: string,
  email: string,
  password: string
) => {
  const candidate = await UserModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (candidate)
    throw ApiError.BadRequest('Username or Email is already taken.');

  const passwordHash = bcrypt.hashSync(password, 8);
  const user = await UserModel.create({
    username,
    email,
    password: passwordHash,
  });

  const tokens = TokenService.generateTokens({ _id: user._id });
  await TokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    _id: user._id,
    username: user.username,
    email: user.email,
  };
};

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw ApiError.BadRequest('Invalid credentials.');

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) throw ApiError.BadRequest('Invalid credentials.');

  const tokens = TokenService.generateTokens({ _id: user._id });
  await TokenService.saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    _id: user._id,
    username: user.username,
    email: user.email,
  };
};
