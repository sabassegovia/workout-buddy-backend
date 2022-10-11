const express = require('express');
const router = express.Router();

//controller functions
const { loginUser, signupUser } = require('../controllers/userController.js');


//log in route
router.post('/login',loginUser);

//sign up route
router.post('/signup', signupUser);

module.exports = router;

//hi