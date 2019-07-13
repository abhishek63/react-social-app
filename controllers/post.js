const Post = require("../models/post");

exports.getPosts = (req, res) => {
  Post.find().then((data) => {
      return res.json({
          data
      })
  });
};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  console.log(req.body)
  post.save((error, data) => {
    if (error) {
      return res.status(400).json({
        Error: "Error in saving post"
      });
    }

    res.status(200).json({
      result: data
    });
  });
};
