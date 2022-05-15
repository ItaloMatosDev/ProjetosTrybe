const userModel = require('../models/userModel');

const validateName = (name) => {
  if (!name) {
    return null;
  }
  return true;
};

const validateEmail = (email) => {
  if (!email || !(/^[\w.]+@[a-z]+.\w{2,3}$/g).test(email)) {
    return false;
  }
  return true;
};

const existentEmail = async (email) => {
  const emailFound = await userModel.findEmail(email);
  return emailFound;
};

const createUser = async (userData) => {
  const newUser = await userModel.createUser(userData);
  return newUser;
};

module.exports = {
  validateName,
  validateEmail,
  existentEmail,
  createUser,
};