import * as comm from '../controllers/comment.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/comments/:id', comm.getComments);
router.post('/create-comment', comm.createComment);
router.put('/update-comment/:id', comm.updateComment);
router.delete('/delete-comment/:id', comm.deleteComment);

export default router;