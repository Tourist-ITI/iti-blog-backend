const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { hashPassword, signUserToken } = require("./auth");

exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // check if user exist
    const checkedUser = await userModel.findOne({ email });
    if (checkedUser) {
      throw errorHandler(
        "email is already exist try different email or sign in",
        400
      );
    }
    // hash password
    const pass = await hashPassword(password);

    // create new user

    await userModel.create({ ...req.body, password: pass });

    //get the user
    const newUser = await userModel.findOne({ email });

    //add access token
    const access_token = await signUserToken(newUser.id);

    // handle response
    successHandler(res, {
      access_token,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};
