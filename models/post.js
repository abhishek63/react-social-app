const mongoose = require("mongoose");

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
  }
});

module.exports = mongoose.model("Post", postSchema);
