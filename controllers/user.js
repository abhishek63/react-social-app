const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

module.exports.findUserById = (req, res, next) => {
  userId = req.params.userId;
  console.log("user id hai", userId);
  User.findById({ _id: userId })
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((error, user) => {
      if (error || !user) {
        return res.json({
          error: "User not found"
        });
      }

      req.profile = user;
      console.log("abhi tak yhi hai");
      next();
    });
};

//get all users
module.exports.getAllUsers = (req, res) => {
  User.find()
    .select("_id name email created")
    .exec((error, users) => {
      if (error) {
        return res.json({
          error
        });
      }
      res.json(users);
    });
};

//find single user
module.exports.getUser = (req, res) => {
  return res.json(req.profile);
};

//update user
module.exports.updateUser = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "photo not updated"
      });
    }
    console.log(fields,"nice to meet you")
    //update user
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();

    console.log("haamarra wla user",user)
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    });
  });
};

//delete user
module.exports.deleteUser = (req, res) => {
  user = req.profile;
  user.remove(error => {
    if (error) {
      return res.json({
        error
      });
    }

    res.json({
      message: "user delete successfully"
    });
  });
};

module.exports.hasAuthorization = (req, res, next) => {
  const authorizedUser =
    req.profile && req.auth && req.profile._id === req.auth._id;

  if (!authorizedUser) {
    return res.json({
      error: "user is not authorized"
    });
  }
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }
  next();
};

//add following
exports.addFollowing = (req, res, next) => {
  console.log("addfollowing ");
  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { following: req.body.followId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.addFollower = (req, res) => {
  console.log("addfolllower ");

  User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      result.hashed_password = undefined;
      result.salt = undefined;
      res.json(result);
    });
};

//remove following
exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $pull: { following: req.body.unfollowId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.removeFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    { $pull: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      result.hashed_password = undefined;
      result.salt = undefined;
      res.json(result);
    });
};
