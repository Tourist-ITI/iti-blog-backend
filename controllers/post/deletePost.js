const { postModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.deletePost = async (req, res, next) => {
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
    await postModel.findByIdAndRemove(postID);

    successHandler(res, post, undefined, "item deleted successfully");
  } catch (err) {
    next(err);
  }
};
