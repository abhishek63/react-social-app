const User = require("../models/user");

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

module.exports.hasAuthorization = (req,res,next)=>{
    const authorizedUser  = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorizedUser){
        return res.json({
            error : "user is not authorized"
        })
    }
}
