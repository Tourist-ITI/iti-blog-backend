const multer = require("multer");
const sharp = require("sharp");
const { errorHandler } = require("../../utils/responseHandler");

//file
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    const ext = file.mimetype.split("/")[1];
    cd(null, `user-${req.userID}-${Date.now()}.${ext}`);
  },
});
//buffer
const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) cd(null, true);
  else cb(errorHandler("file must be image", 400), false);
};

exports.resizePostImage = async (req, res, next) => {
  if (req.file)
    req.file.photo = await this.sharpHandler(req.file.buffer, req.userID);

  next();
};

exports.resizeUserImage = async (req, res, next) => {
  if (req.files?.photo) {
    req.files.photo = await Promise.all(
      req.files.photo.map((item) => this.sharpHandler(item.buffer, req.userID))
    );
  }
  if (req.files?.cover_photo) {
    req.files.cover_photo = await Promise.all(
      req.files.cover_photo?.map((item) =>
        this.sharpHandler(item.buffer, req.userID)
      )
    );
  }

  next();
};

const upload = multer({ storage: multerStorage, fileFilter });
//upload single
exports.uploadSingleImage = (image) => {
  if (!image) next();
  return upload.single(image);
};
//upload multiple image
exports.uploadMultiImages = (arrayOfFields, edit = false) => {
  if (arrayOfFields.length === 0 && !edit) {
    throw errorHandler("require images ", 400);
  }

  return upload.fields(arrayOfFields);
};

exports.sharpHandler = async (buffer, id) => {
  const uniqueNumber = Date.now();
  await sharp(buffer)
    .resize({
      width:1600,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .flatten({ background: "#fff" })
    .toFormat("jpeg")
    .webp({ quality: 90 })
    .toFile(`uploads/user-${id}-${uniqueNumber}.jpeg`);

  return `uploads/user-${id}-${uniqueNumber}.jpeg`;
};
