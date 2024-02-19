import * as user from '../controllers/user.controller.js';
import Router from 'express';

const router = Router();

router.get('/users-online', user.getUsersOnline);
router.post('/user-by-id', user.getUserById);

export default router;