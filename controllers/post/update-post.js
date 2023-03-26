const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const { uploadCloudBB } = require("../../middlewares/imgbb/imgbb");
const { postModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.updatePost = async (req, res, next) => {
  try {
    const { postID } = req.params;

    if (!postID) {
      throw errorHandler("invalid post id", 400);
    }
    const post = await postModel.findById(postID);

    if (!post) {
      throw errorHandler("post not found", 404);
    }

    if (parseInt(post.user) !== parseInt(req.userID)) {
      throw errorHandler("unauthorized", 401);
    }

    let postData = { ...req.body, user: req.userID };

    if (req.file?.photo) {
      postData.photo = await uploadCloudBB(req.file.photo);
    }

    await postModel.findByIdAndUpdate(postID, {
      ...postData,
    });
    const postUpdated = await postModel.findById(postID);
    successHandler(res, postUpdated);
  } catch (err) {
    next(err);
  }
};
