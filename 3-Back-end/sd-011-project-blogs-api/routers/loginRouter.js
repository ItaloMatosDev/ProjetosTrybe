const express = require('express');

const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/',
loginController.validateEmail,
loginController.validatePass,
loginController.loginUser);

module.exports = router;