const categoriesService = require('../services/categoriesServices');
require('dotenv');

const validateCategoryName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const createCategory = async (req, res) => {
  const result = await categoriesService.createCategory(req.body);
  return res.status(201).json(result);
};

const getAllCategories = async (req, res) => {
  const result = await categoriesService.getAllCategories();
  return res.status(200).json(result);
};

module.exports = {
  validateCategoryName,
  createCategory,
  getAllCategories,
};