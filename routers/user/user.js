const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { getOneUser } = require("../../controllers/users/get_one");
const { updateUser } = require("../../controllers/users/update_user");

//image controller
const {
  uploadMultiImages,
  sharpHandler,
  resizeUserImage,
} = require("../../middlewares/upload-img/upload-img");

const userRouter = express.Router();

userRouter.get("/:userID", getOneUser);

userRouter.patch(
  "/",
  protect,

  uploadMultiImages([
    { name: "photo", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
  ]),
  resizeUserImage,
  updateUser
);

module.exports = userRouter;
