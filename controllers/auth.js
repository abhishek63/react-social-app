const User = require("../models/user");

exports.signUp = async (req, res) => {
  //if user already exits
  const userExits = await User.findOne({ email: req.body.email });
  if (userExits) {
    return res.json({
      message: "user already exits!"
    });
  }

  // store user into database
  const user = new User(req.body);
  user.save((error, data) => {
    if (error) {
      return res.status(400).json({
        Error: "Error in registering user"
      });
    }
    res.status(200).json({
      message: "user created" ,
      data
    });
  });
};

