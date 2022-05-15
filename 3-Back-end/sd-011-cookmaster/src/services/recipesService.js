const recipesModel = require('../models/recipesModel');

// const validateName = async (name) => {
//   if (!name) return false;
//   return true;
// };

// const validateIngredients = async (ingredient) => {
//   if (!ingredient) return false;
//   return true;
// };

// const validatePreparation = async (preparation) => {
//   if (!preparation) return false;
//   return true;
// };

const createRecipe = async (recipeData) => {
  const createdRecipe = await recipesModel.createRecipe(recipeData);
  return createdRecipe;
};

const getAll = async () => {
  const allRecipes = await recipesModel.getAll();
  return allRecipes;
};

const getById = async (id) => {
  const recipeDetail = await recipesModel.getById(id);
  return recipeDetail;
};

const updateRecipe = async ({ recipeId, name, ingredients, preparation, id, role }) => {
  const verifyAdmin = await recipesModel.getById(recipeId);
  const { userId } = verifyAdmin;
  if (id !== userId && role !== 'admin') {
    return null;
  }
  const recipe = await recipesModel.updateRecipe(recipeId, name, ingredients, preparation);
  return recipe;
};

const deleteRecipe = async ({ recipeId, id, role }) => {
  // verificacao de token
  const verifyAdmin = await recipesModel.getById(recipeId);
  const { userId } = verifyAdmin;
  if (id !== userId && role !== 'admin') {
    return false;
  }
  const deletedRecipe = await recipesModel.deleteRecipe(recipeId);
  return deletedRecipe;
};

const uploadImage = async ({ recipeId, id, role }, image) => {
  const verifyAdmin = await recipesModel.getById(recipeId);
  const { userId } = verifyAdmin;
  if (id !== userId && role !== 'admin') {
    return null;
  }
  const imageUpload = await recipesModel.upload(recipeId, image);
  return imageUpload;
};

module.exports = {
  // validateName,
  // validateIngredients,
  // validatePreparation,
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};