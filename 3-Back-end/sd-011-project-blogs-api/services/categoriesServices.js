const { Categories } = require('../models');

const createCategory = async (category) => {
  const result = await Categories.create(category);
  return result;
};

const getAllCategories = async () => {
  const result = await Categories.findAll();
  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
};