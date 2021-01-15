const jwt = require('jsonwebtoken');
const config = require('config');

const createToken = (id, maxAge) => {
  return jwt.sign({ user: { id } }, config.jwtSecret, {
    expiresIn: maxAge,
  });
};

module.exports = { createToken };
