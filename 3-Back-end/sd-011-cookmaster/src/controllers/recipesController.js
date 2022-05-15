const path = require('path');
const recipesService = require('../services/recipesService');
const { upload } = require('../middlewares/upload');

const invalidEntries = { message: 'Invalid entries. Try again.' };
const notFoundRecipe = { message: 'recipe not found' };

const verifyRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) { 
    return res.status(400).json(invalidEntries); 
  }
  next();
};

const createRecipe = async (req, res) => {
  const id = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipeCreated = await recipesService.createRecipe({
    userId: id, name, ingredients, preparation,
  });
  return res.status(201).json({ recipe: recipeCreated });
};

const getAll = async (_req, res) => {
  const allRecipes = await recipesService.getAll();
  return res.status(200).json(allRecipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipeDetail = await recipesService.getById(id);
  if (!recipeDetail) {
    return res.status(404).json(notFoundRecipe);
  }
  return res.status(200).json(recipeDetail);
};

const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const id = req.user;
  const { role } = req;
  const { name, ingredients, preparation } = req.body;
  const updatedRecipe = await recipesService.updateRecipe(
    { recipeId, name, ingredients, preparation, id, role },
  );
  if (!updatedRecipe) {
    return res.status(401).json({ message: 'Recipe owner incorrect ' });
  }
  return res.status(200).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const id = req.user;
  const { role } = req;
  const recipe = await recipesService.deleteRecipe({ recipeId, id, role });
  if (recipe) {
    return res.status(204).end();
  }
};

const uploadImage = [
  upload.single('image'),
  async (req, res) => {
    const { recipeId } = req.params;
    const id = req.user;
    const { role } = req;
    const imageUpload = await recipesService.uploadImage({
      recipeId, id, role,
    }, path.join('localhost:3000', 'src', 'uploads', `${recipeId}.jpeg`));
    return res.status(200).json(imageUpload);
  },
];

module.exports = {
  verifyRecipe,
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};