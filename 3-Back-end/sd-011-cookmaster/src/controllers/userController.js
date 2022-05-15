const userService = require('../services/userService');

const messageError = { message: 'Invalid entries. Try again.' };

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!userService.validateName(name)) {
    return res.status(400).json(messageError);
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  const validEmail = userService.validateEmail(email);
  if (!validEmail) {
    return res.status(400).json(messageError);
  }

  const emailExists = await userService.existentEmail(email);
  if (emailExists) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) { return res.status(400).json({ message: 'Invalid entries. Try again.' }); }
  next();
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const result = await userService.createUser({ name, email, password });
  return res.status(201).json({ user: result });
};

module.exports = {
  validateName,
  validateEmail,
  verifyPassword,
  createUser,
};