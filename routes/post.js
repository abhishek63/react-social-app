const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/", requireSignIn, getPosts); //get all posts
router.post("/post", createPost); //create new post

module.exports = router;
