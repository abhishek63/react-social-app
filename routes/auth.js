const express = require("express");
const { signUp, signIn } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", signUp); //new user registration
router.post("/signin", signIn); //signin routes

module.exports = router;
