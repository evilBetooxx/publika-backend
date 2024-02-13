import * as comm from '../controllers/comment.controller.js';
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/comments', authRequired, comm.getComments);
router.post('/comments', authRequired, comm.createComment);
router.put('/update-comment/:id', authRequired, comm.updateComment);
router.delete('/delete-comment/:id', authRequired, comm.deleteComment);

export default router;