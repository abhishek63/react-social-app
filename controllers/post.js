const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");


//findPost by particular id
module.exports.findPostById = (req, res, next) => {
  console.log("authoooo",req.auth)
  postId = req.params.postId;
  Post.findById({ _id: postId })
    .populate("postedBy", "_id name")
    .exec((error, post) => {
      if (error || !post) {
        return res.json({
          error: "Post not found"
        });
      }

      req.post = post;
      next();
    });
};

exports.getPosts = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then(data => {
      return res.json(data);
    });
};

exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.json({ message: "image not uploaded" });
    }
    let post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
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
  });
};

//get post by logged in user

module.exports.getPostByUser = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .exec((err, posts) => {
      if (err) {
        return res.json({ message: err });
      }

      res.json(posts);
    });
};

//delete post
module.exports.deletePost = (req, res) => {
  console.log("authoooo",req.auth)
  post = req.post;
  post.remove(error => {
    if (error) {
      return res.json({
        error
      });
    }

    res.json({
      message: "post delete successfully"
    });
  });
};

//update post
module.exports.updatePost = (req,res)=>{
  let post = req.post;
  post = _.extend(post,req.body);
  post.save((error)=>{
      if(error){
          return res.json({error})
      }

      res.json({
          post
      })
  })
}

//for checking authorized user

exports.isPoster = (req, res, next) => {
  console.log(req.auth._id)
  let authorizedUser =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;
  console.log("isposter", authorizedUser);
  if (!authorizedUser) {
    return res.json({ message: "user not authorized for accessing post" });
  }
  next();
};
