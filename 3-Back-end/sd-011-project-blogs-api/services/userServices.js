const { Users } = require('../models');
require('dotenv');

const validateDisplayName = (displayName) => {
  if (displayName.length < 8) return false;
  return true;
};

const validateEmail = (email) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  return emailRegex.test(email);
};

const validateUser = async (email) => {
  const result = await Users.findOne({ where: { email } });
  if (result) return true;
  return false;
};

const addUser = async (user) => {
  const result = await Users.create(user);
  return result;
};

const getAllUsers = async () => {
  const result = await Users.findAll();
  return result;
};

const getUserById = async (id) => {
  const result = await Users.findOne({ where: { id } });
  return result;
};

module.exports = {
  validateDisplayName,
  validateEmail,
  validateUser,
  addUser,
  getAllUsers,
  getUserById,
};