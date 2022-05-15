const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', 
userController.validateDisplayName,
userController.validateEmail,
userController.validatePass,
userController.validateUser,
userController.addUser);

router.get('/',
validateJWT,
userController.getAllUsers);

router.get('/:id',
validateJWT,
userController.getUserById);

module.exports = router;