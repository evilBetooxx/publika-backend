import * as user from '../controllers/user.controller.js';
import Router from 'express';

const router = Router();

router.get('/users-online', user.getUsersOnline);

export default router;