const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const { _id, role } = decoded.data;
    req.user = _id;
    req.role = role;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
module.exports = validateJWT;
