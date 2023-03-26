const { uploadCloudBB } = require("../../middlewares/imgbb/imgbb");
const {
  sharpHandler,
  uploadSingleImage,
} = require("../../middlewares/upload-img/upload-img");
const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { hashPassword, comparePassword } = require("../auth/auth");

exports.updateUser = async (req, res, next) => {
  try {
    const { new_password, curr_password } = req.body;
    const getUser = await userModel.findById(req.userID).select("password");

    console.log(getUser);
    if (parseInt(getUser.id) !== parseInt(req.userID)) {
      throw errorHandler("unauthorized", 401);
    }

    let userBody = { ...req.body };

    if (new_password && new_password === curr_password) {
      throw errorHandler("new password should be different", 401);
    }

    if (curr_password && new_password) {
      await comparePassword(curr_password, getUser.password);
      userBody.password = await hashPassword(new_password);
    }

    await userModel.findByIdAndUpdate(req.userID, userBody);

    if (req.files?.photo) {
      userBody.photo = await uploadCloudBB(...req.files.photo);
    }

    if (req.files?.cover_photo) {
      userBody.cover_photo = await uploadCloudBB(...req.files.cover_photo);
    }

    await userModel.findByIdAndUpdate(req.userID, userBody);

    const updatedUser = await userModel.findById(req.userID);

    successHandler(res, updatedUser);
  } catch (err) {
    next(err);
  }
};
