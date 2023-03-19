//core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    photo: Array,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);
module.exports = postSchema;
