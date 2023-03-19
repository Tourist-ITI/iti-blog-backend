const joi = require("joi");

//custom module
const { errorHandler } = require("../../utils/responseHandler");

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

const validPost = async (req, res, next) => {
  try {
    await postSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(
      errorHandler(
        err.details.map((err) => err.message),
        400
      )
    );
  }
};

module.exports = validPost;
