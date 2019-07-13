const express = require('express');
const {signUp} = require('../controllers/auth')

const router = express.Router();

router.post('/signup',signUp); //new user registration


module.exports = router;