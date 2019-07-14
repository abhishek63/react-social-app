const express = require("express");
const { getAllUsers, getUser, findUserById } = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/users", getAllUsers); //get all users
router.get("/user/:userId", requireSignIn, getUser); //get particular user

router.param("userId", findUserById);

module.exports = router;
