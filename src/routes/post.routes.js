import * as post from '../controllers/post.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/posts', post.getPosts);
router.get('/posts/:id', post.getPost);
router.get('/posts-category/:id', post.getPostsByCategory);
router.post('/create-post', post.createPost);
router.put('/update-post/:id', post.updatePost);
router.delete('/delete-post/:id', post.deletePost);

export default router;