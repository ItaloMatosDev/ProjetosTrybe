const jwt = require('jsonwebtoken');

const secret = require('fs')
.readFileSync('../back-end/jwt.evaluation.key', { encoding: 'utf-8' })
.trim();

const create = (id, email) => {
  const payload = { id, email };
  const jwtConfig = {
    algorithm: 'HS256',
    expiresIn: '30d',
  };
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = { create, verify };
