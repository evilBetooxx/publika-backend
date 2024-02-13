import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (req, res) => {
  const { content } = req.body;

  try {
    const newComment = new Comment({
      content,
      userID: req.user.id,
    });
    const commentSaved = await newComment.save();
    res.json(commentSaved);
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req, res) => {
  const { title, content } = req.body;

  try {
    const commentUpdated = await Comment.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    res.json(commentUpdated);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentDeleted = await Comment.findByIdAndDelete(req.params.id);
    res.json(commentDeleted);
  } catch (error) {
    console.log(error);
  }
};
