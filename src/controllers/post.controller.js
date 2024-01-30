import Post from '../models/post.model.js';
import { io } from '../app.js';
import { v2 as cloudinary } from "cloudinary";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        console.log(error);
    }
}

export const getPostsByCategory = async (req, res) => {
    try {
        const posts = await Post.find({ categoryID: req.params.id });
        res.json(posts);
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req, res) => {
    const { title, content, categoryID, photo } = req.body;

    try {
        const newPost = new Post({ title, content, photo, categoryID, userID: req.user.id});
        const postSaved = await newPost.save();
        io.emit("newPost", postSaved.title);
        res.json(postSaved);
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const postUpdated = await Post.findByIdAndUpdate(req.params.id, { title, content });
        res.json(postUpdated);
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req, res) => {
    try {
        const postDeleted = await Post.findByIdAndDelete(req.params.id);
        res.json(postDeleted);
    } catch (error) {
        console.log(error);
    }
}

export const uploadPostImage = async (req, res) => {
    try {
      const imagenBuffer = req.file;
      const result = await cloudinary.uploader.upload(imagenBuffer.path)
      console.log(result.secure_url);
  
      res.json(result.secure_url);
    } catch (error) {
      console.log(error);
    }
  };