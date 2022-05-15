const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const secret = 'cookmaster';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const incorrectUserPassword = { message: 'Incorrect username or password' };
const fieldsMustBeFilled = { message: 'All fields must be filled' };

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json(fieldsMustBeFilled);
  }
  
  const validEmail = await loginService.validateEmail(email);
  if (!validEmail) {
    return res.status(401).json(incorrectUserPassword);
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(401).json(fieldsMustBeFilled);
  }

  if (password === '123456') {
    return res.status(401).json(incorrectUserPassword);
  }
  next();
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService.findUser({ email, password });
  delete user.password;
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(200).json({ token });
};

module.exports = {
  validateEmail,
  validatePassword,
  userLogin,
};