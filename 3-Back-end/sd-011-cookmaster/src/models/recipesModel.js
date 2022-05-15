const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(recipeData);
  return recipe.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipeDetail = await db.collection('recipes').findOne(ObjectId(id));
  return recipeDetail;
};

const updateRecipe = async (recipeId, name, ingredients, preparation) => {
  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(recipeId) }, { $set: { name, ingredients, preparation } },
  );
  const recipeUpdate = getById(recipeId);
  return recipeUpdate;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const deleted = await db.collection('recipes')
  .findOneAndDelete({ _id: ObjectId(id) });
  return deleted;
};

const upload = async (recipeId, image) => {
  const db = await connection();
  if (!ObjectId.isValid(recipeId)) return null;
  const result = await db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(recipeId) }, { $set: { image } }, { returnOriginal: false },
  );
  return result.value;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
  deleteRecipe,
  upload,
};