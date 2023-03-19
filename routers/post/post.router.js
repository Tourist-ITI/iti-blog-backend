const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const { createPost } = require("../../controllers/post/add-post");
const { deletePost } = require("../../controllers/post/deletePost");
const { getOnePost } = require("../../controllers/post/get-one-post");
const { getPosts } = require("../../controllers/post/get-posts");
const { updatePost } = require("../../controllers/post/update-post");

//image controller
const {
  resizePostImage,
  uploadSingleImage,
} = require("../../middlewares/upload-img/upload-img");
const validPost = require("../../validation/post/post");

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.get("/:postID", getOnePost);
postRouter.post(
  "",
  protect,
  uploadSingleImage("photo"),
  validPost,
  resizePostImage,
  createPost
);
postRouter.patch(
  "/:postID",
  protect,
  uploadSingleImage("photo"),
  validPost,
  resizePostImage,
  updatePost
);
postRouter.delete("/:postID", protect, deletePost);

module.exports = postRouter;
