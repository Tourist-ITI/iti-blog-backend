const { postModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getOnePost = async (req, res, next) => {
  try {
    const { postID } = req.params;

    if (!postID) {
      throw errorHandler("invalid post id", 400);
    }
    const post = await postModel.findById(postID).populate("user");

    if (!post) {
      throw errorHandler("post not found", 404);
    }

    successHandler(res, post, undefined);
  } catch (err) {
    next(err);
  }
};
