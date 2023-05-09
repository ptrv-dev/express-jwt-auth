import { Express, Router } from 'express';
const router = Router();

import * as UserController from '../controllers/user.controller';
import checkAuthMiddleware from '../middlewares/check-auth.middleware';

router.post('/auth/registration', UserController.registration);
router.post('/auth/login', UserController.login);
router.get('/auth/refresh', UserController.refresh);
router.get('/auth/get', checkAuthMiddleware, UserController.getMe);
router.get('/auth/logout', checkAuthMiddleware, UserController.logout);

export default router;
