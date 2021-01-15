const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  /* get token */
  const token = req.cookies.authToken;

  /* check if there is not a token */
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
