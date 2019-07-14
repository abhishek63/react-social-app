const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");

exports.getPosts = (req, res) => {
  Post.find().then(data => {
    return res.json({
      data
    });
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
  Post.find({postedBy : req.profile._id})
  .populate("postedBy","_id name")
  .exec((err,posts)=>{
    if(err){
      return res.json({message : err})
    }

    res.json(posts);
  })
};
