const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Post title is required and minimum charcter is six character",
    minlength: 6,
    maxlength: 200
  },
  body: {
    type: String,
    required:
      "Post body field is required and minimun character allowed is six",
    maxlength: 2000
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
