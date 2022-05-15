const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const validateJWT = require('../middlewares/validateJWT');

router.post('/',
postController.validateTitle,
postController.validateContent,
postController.validateCategoryId,
validateJWT,
postController.createPost);

router.get('/',
validateJWT,
postController.getAllPosts);

router.get('/:id',
validateJWT,
postController.getById);

module.exports = router;