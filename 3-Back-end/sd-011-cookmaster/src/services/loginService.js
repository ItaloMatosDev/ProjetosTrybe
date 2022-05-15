const loginModel = require('../models/loginModel');

const validateEmail = (email) => {
  if (!(/^[\w.]+@[a-z]+.\w{2,3}$/g).test(email)) {
    return false;
  }
  return true;
};

const findUser = async (login) => {
  const { password } = login;
  const userFound = await loginModel.findUser(login);
  if (!userFound || userFound.password !== password) return false;
  return userFound;
};

module.exports = {
  validateEmail,
  findUser,
};