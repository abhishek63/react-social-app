const express = require("express");
const {
  getPosts,
  createPost,
  getPostByUser,
  findPostById,
  deletePost,
  updatePost,
  isPoster,
  postPhoto,
  getSinglePost
} = require("../controllers/post");
const { findUserById } = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const router = express.Router();

router.get("/posts", getPosts); //get all posts
router.get("/post/:postId", getSinglePost); //get single posts
router.post("/post/new/:userId", requireSignIn, createPost); //create new post
router.get("/posts/by/:userId", requireSignIn, getPostByUser); // get all post by user
router.delete("/post/:postId",requireSignIn,isPoster, deletePost); // delete post
router.put("/post/:postId",requireSignIn,isPoster, updatePost); // update post
router.get("/post/photo/:postId", postPhoto); //get post photo


router.param("userId", findUserById);
router.param("postId", findPostById);

module.exports = router;
