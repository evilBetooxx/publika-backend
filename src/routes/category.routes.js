import * as cat from '../controllers/category.controller.js';   
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/categories', authRequired, cat.getCategories);
router.post('/categories', cat.createCategory);

export default router;