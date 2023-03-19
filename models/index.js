const mongoose = require("mongoose");

//app schema
const userSchema = require("../schema/user/userSchema");
const PostSchema = require("../schema/post/postSchema");

//app models
const userModel = mongoose.model("User", userSchema);
const postModel = mongoose.model("Post", PostSchema);

module.exports = {
  userModel,
  postModel,
};
