const express = require('express');

const router = express.Router();

const recipesControler = require('../controllers/recipesController');

const validateJWT = require('../api/auth/validateJWT');

router.post('/',
validateJWT,
recipesControler.verifyRecipe,
recipesControler.createRecipe);

router.get('/',
recipesControler.getAll);

router.get('/:id',
recipesControler.getById);

router.put('/:recipeId',
validateJWT,
recipesControler.updateRecipe);

router.put('/:recipeId/image',
validateJWT,
recipesControler.uploadImage);

router.delete('/:recipeId',
validateJWT,
recipesControler.deleteRecipe);

module.exports = router;