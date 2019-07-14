const User = require("../models/user");
const _ = require("lodash");

module.exports.findUserById = (req, res, next) => {
  userId = req.params.userId;
  console.log("user id hai",userId)
  User.findById({ _id: userId })
    .select("_id name email")
    .exec((error, user) => {
      if (error || !user) {
        return res.json({
          error: "User not found"
        });
      }

      req.profile = user;
      next();
    });
};

//get all users
module.exports.getAllUsers = (req,res)=>{
    User.find((error,users)=>{
        if(error){
            return res.json({
                error
            })
        }

        res.json({
            users
        })

    })
}

//find single user
module.exports.getUser = (req,res)=>{
    return res.json(req.profile);
}

//update user
module.exports.updateUser = (req,res)=>{
    console.log("req.profile",req.profile)
    let user = req.profile;
    user = _.extend(user,req.body);
    console.log("xxxxxxxxxx")
    user.save((error)=>{
        if(error){
            return res.json({error})
        }

        res.json({
            user
        })
    })
}

//delete user
module.exports.deleteUser = (req,res)=>{
    user = req.profile;
    user.remove((error)=>{
        if(error){
            return res.json({
                error
            })
        }

        res.json({
            message : "user delete successfully"
        })
    })
}

module.exports.hasAuthorization = (req,res,next)=>{
    const authorizedUser  = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorizedUser){
        return res.json({
            error : "user is not authorized"
        })
    }
}
