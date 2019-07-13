const express = require("express");
const { signUp, signIn, signOut } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signUp); //new user registration
router.post("/signin", signIn); //signin routes
router.get("/signout", signOut); //signin routes

module.exports = router;
