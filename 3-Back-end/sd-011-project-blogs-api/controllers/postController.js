const postService = require('../services/postService');

const validateTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const validateContent = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

const validateCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds || categoryIds.length === 0) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  const categoryExistent = await postService.findCategories(categoryIds);
  const existent = categoryExistent.some((item) => item !== null);
  if (!existent) return res.status(400).json({ message: '"categoryIds" not found' });
  next();
};

const createPost = async (req, res) => {
  const { user } = req;
  const result = await postService.createPost(req.body, user);
  const { id, title, content, userId } = result;
  return res.status(201).json({ id, title, content, userId });
};

const getAllPosts = async (req, res) => {
  const result = await postService.getAllPosts();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getById(id);
  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(result);
};

module.exports = {
  createPost,
  validateTitle,
  validateContent,
  validateCategoryId,
  getAllPosts,
  getById,
};