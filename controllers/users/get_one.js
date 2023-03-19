const { userModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userID);

    if (!user) throw errorHandler("user not found", 404);

    successHandler(res, user);
  } catch (err) {
    next(err);
  }
};
