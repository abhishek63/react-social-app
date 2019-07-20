const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

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
    User.find()
    .select("_id name email created")
    .exec((error,users)=>{
        if(error){
            return res.json({
                error
            })
        }
        res.json(users)

    })
}

//find single user
module.exports.getUser = (req,res)=>{
    return res.json(req.profile);
}

//update user
module.exports.updateUser = (req,res,next)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req , (err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error : "photo not updated"
            })
        }
        //update user
        let user = req.profile
        user = _.extend(user,fields);
        user.updated = Date.now();

        if(files.photo){
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }
        user.save((error,result)=>{
            if(error){
                return res.status(400).json({
                    error 
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user)
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
