const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const { postModel } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.createPost = async (req, res, next) => {
  try {
    let post = { ...req.body, user: req.userID };

    if (req.file?.photo) {
      post.photo = await uploadCloud(req.file.photo);
    }

    createdPost = new postModel(post);
    await postModel.create(createdPost);

    successHandler(res, createdPost);
  } catch (err) {
    next(err);
  }
};
