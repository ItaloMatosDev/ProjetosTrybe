const jwt = require('jsonwebtoken');
const loginServices = require('../services/loginService');
require('dotenv');

const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (email === '') {
    return res.status(400).json(
      { message: '"email" is not allowed to be empty' },
    );
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  next();
};

const validatePass = (req, res, next) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

const loginUser = async (req, res) => {
  const validateUser = await loginServices.validateUser(req.body);
  if (validateUser) {
    const { id, displayName, email, image } = validateUser;
    const token = jwt.sign(
      { id, displayName, email, image },
      process.env.JWT_SECRET,
      jwtConfiguration,
    );
    return res.status(200).json({ token });
  }
  return res.status(400).json({ message: 'Invalid fields' });
};

module.exports = {
  validateEmail,
  validatePass,
  loginUser,
};