const express = require("express");
const {
  getAllUsers,
  getUser,
  findUserById,
  updateUser,
  deleteUser
} = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/users", getAllUsers); //get all users
router.get("/user/:userId", requireSignIn, getUser); //get particular user
router.put("/user/:userId", updateUser); //update user profile
router.delete("/user/:userId", deleteUser); //delete user 

router.param("userId", findUserById);

module.exports = router;