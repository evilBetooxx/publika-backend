import * as comm from '../controllers/comment.controller.js';
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/comments/:id', authRequired, comm.getComments);
router.post('/create-comment', authRequired, comm.createComment);
router.put('/update-comment/:id', authRequired, comm.updateComment);
router.delete('/delete-comment/:id', authRequired, comm.deleteComment);

export default router;