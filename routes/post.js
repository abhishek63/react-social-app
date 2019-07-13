const express = require('express');
const {getPosts,createPost} = require('../controllers/post')

const router = express.Router();

router.get('/',getPosts);   //get all posts
router.post('/post',createPost); //create new post


module.exports = router;