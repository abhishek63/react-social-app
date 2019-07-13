const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
      message: "user created",
      data
    });
  });
};

exports.signIn = (req, res) => {
  
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    //if user exit then authenticate
    if (error || !user) {
      return res.json({
        error: "user with this email not registered"
      });
    }

    if (!user.authenticate(password)) {
      return res.json({
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
exports.signOut = (req,res)=>{
    res.clearCookie("token");
    res.json({
        message : "signout success!!"
    })
}