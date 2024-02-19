import Comment from "../models/comment.model.js";

let comments = {};
let hasNewComment = false;

export const getComments = async (req, res) => {
  try {
    const id = Math.random();
    comments[id] = res;

    req.on("close", function () {
      delete comments[id];
    });

    const data = await waitForComments(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const waitForComments = async (id) => {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (hasNewComment) {
        clearInterval(intervalId);
        resolve();
        hasNewComment = false;
      }
    }, 1000);

    
    comments[id].on("close", () => {
      clearInterval(intervalId);
      delete comments[id];
    });
  });
};

export const createComment = async (req, res) => {
  console.log(req.body);
  const { content } = req.body;

  try {
    const newComment = new Comment({
      content,
      userID: req.user.id,
    });
    const commentSaved = await newComment.save();

    
    hasNewComment = true;

    
    for (let id in comments) {
      let res = comments[id];
      res.end(JSON.stringify(commentSaved));
      delete comments[id];
    }

    res.json(commentSaved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
