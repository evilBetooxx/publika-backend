import * as post from '../controllers/post.controller.js';
import { Router } from 'express';
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { authRequired} from "../middlewares/validateToken.js";

cloudinary.config({
  cloud_name: "dn1ng7anm",
  api_key: "914752262761932",
  api_secret: "oyCgLbA1Ui12EAO6UT7mvrdKc-o",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clients",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

const router = Router();

router.get('/posts', authRequired, post.getPosts);
router.get('/posts/:id', authRequired, post.getPost);
router.get('/posts-category/:id', authRequired, post.getPostsByCategory);
router.post('/create-post', authRequired, post.createPost);
router.post("/upload-image", [authRequired, upload.single("file")], post.uploadPostImage);
router.put('/update-post/:id', authRequired, post.updatePost);
router.delete('/delete-post/:id', authRequired, post.deletePost);

export default router;