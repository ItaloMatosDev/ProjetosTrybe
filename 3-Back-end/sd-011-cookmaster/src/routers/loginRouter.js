const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');

router.post('/', 
loginController.validateEmail,
loginController.validatePassword,
loginController.userLogin);

module.exports = router;