const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String
  },
  salt: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  about :{
    type : String
  },
  street : {
    type : String,
    default : "Street"
  },
  city : {
    type : String,
    default : "City"
  },
  state : {
    type: String,
    default : "State"
  },
  updated: Date,
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }]
});

userSchema
  .virtual("password")
  .set(function(password) {
    // generate a salt
    this.salt = uuidv1(); // ⇨ '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'

    // creating password in hashed format
    this.hashed_password = this.encryptPassword(password);
  })
  .get();

userSchema.methods = {
  encryptPassword: function(password) {
    return crypto
      .createHmac("sha1", this.salt)
      .update(password)
      .digest("hex");
  },

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  }
};

module.exports = mongoose.model("User", userSchema);
