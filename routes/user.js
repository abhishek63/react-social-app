const express = require("express");
const {
  getAllUsers,
  getUser,
  findUserById,
  updateUser,
  deleteUser,
  userPhoto
} = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/users", getAllUsers); //get all users
router.get("/user/:userId", requireSignIn, getUser); //get particular user
router.put("/user/:userId", requireSignIn, updateUser); //update user profile
router.delete("/user/:userId", deleteUser); //delete user 
router.get("/user/photo/:userId", userPhoto); //get user profile photo 

router.param("userId", findUserById);

module.exports = router;
