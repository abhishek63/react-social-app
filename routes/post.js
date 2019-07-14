const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/", getPosts); //get all posts
router.post("/post", requireSignIn, createPost); //create new post

module.exports = router;
