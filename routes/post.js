const express = require("express");
const { getPosts, createPost, getPostByUser } = require("../controllers/post");
const { findUserById } = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/", getPosts); //get all posts
router.post("/post/new/:userId", requireSignIn, createPost); //create new post
router.get("/posts/by/:userId", requireSignIn, getPostByUser); // get all post by user

router.param("userId", findUserById);

module.exports = router;
