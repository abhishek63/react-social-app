const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const dotenv = require("dotenv");

dotenv.config();

exports.signUp = async (req, res) => {
  //if user already exits
  const userExits = await User.findOne({ email: req.body.email });
  if (userExits) {
    return res.status(403).json({
      error: "user already exits!"
    });
  }

  // store user into database
  const user = new User(req.body);
  user.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: "error in registering user"
      });
    }
    res.status(200).json({
      message: "Signup success ! please login..."
    });
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    //if user exit then authenticate
    if (error || !user) {
      return res.status(401).json({
        error: "user with this email not registered"
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password not matched"
      });
    }

    // generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // cookie parser
    res.cookie("token", token, { expire: new Date() + 9999 });

    //destructring the user
    const { _id, name, email } = user;
    return res.json({
      token,
      user: { _id, name, email }
    });
  });
};

//signout
exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "signout success!!"
  });
};

//require sign in middleware for authorizing the user

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
