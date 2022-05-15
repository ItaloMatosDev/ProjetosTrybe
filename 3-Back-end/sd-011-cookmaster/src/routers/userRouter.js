const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', 
userController.validateName,
userController.validateEmail,
userController.verifyPassword,
userController.createUser);

module.exports = router;