import * as cat from '../controllers/category.controller.js';   
import { Router } from 'express';

const router = Router();

router.get('/get-cat', cat.getCategories);
router.post('/create-cat', cat.createCategory);

export default router;