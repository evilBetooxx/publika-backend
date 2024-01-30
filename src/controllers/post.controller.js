import Post from '../models/post.model';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
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
    const { title, content, categoryID } = req.body;

    try {
        const newPost = new Post({ title, content, categoryID, userID: req.user.id});
        const postSaved = await newPost.save();
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