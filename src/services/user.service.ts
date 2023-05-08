import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';

import * as TokenService from './token.service';

export const registration = async (
  username: string,
  email: string,
  password: string
) => {
  const candidate = await UserModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (candidate) throw new Error('Username or Email is already taken.');

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
