import { Express, Router } from 'express';
const router = Router();

import * as UserController from '../controllers/user.controller';

router.post('/auth/registration', UserController.registration);
router.post('/auth/login', UserController.login);
router.get('/auth/refresh', UserController.refresh);

export default router;
