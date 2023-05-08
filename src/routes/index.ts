import { Express } from 'express';

import * as UserController from '../controllers/user.controller';

export default (app: Express) => {
  app.post('/auth/registration', UserController.registration);
};
