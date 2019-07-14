const express = require("express");
const {
  getPosts,
  createPost,
  getPostByUser,
  findPostById,
  deletePost,
  isPoster
} = require("../controllers/post");
const { findUserById } = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/posts", getPosts); //get all posts
router.post("/post/new/:userId", requireSignIn, createPost); //create new post
router.get("/posts/by/:userId", requireSignIn, getPostByUser); // get all post by user
router.delete("/post/:postId",requireSignIn,isPoster, deletePost); // delete post

router.param("userId", findUserById);
router.param("postId", findPostById);

module.exports = router;
