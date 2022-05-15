const { BlogPosts } = require('../models');
const { Categories } = require('../models');
const { Users } = require('../models');

const createPost = async (post, id) => {
  const postUser = {
    title: post.title,
    content: post.content,
    userId: id,
  };
  const result = await BlogPosts.create(postUser);
  return result;
};

const findCategories = async (idCategory) => {
  const result = await idCategory.map((id) => Categories.findOne({ where: { id } }));
  return Promise.all(result).then((values) => values);
};

const getAllPosts = async () => {
  const result = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: 'password' } },
      { model: Categories, as: 'categories' },
    ],
  });
  return result;
};

const getById = async (id) => {
  const result = await BlogPosts.findOne({ where: { id },
    include: [
      { model: Users, as: 'user', attributes: { exclude: 'password' } },
      { model: Categories, as: 'categories' },
    ],
  });
  return result;
};

module.exports = {
  createPost,
  findCategories,
  getAllPosts,
  getById,
};