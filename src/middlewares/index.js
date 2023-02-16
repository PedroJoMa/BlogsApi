const verifyEmail = require('./verifyEmail.middleware');
const verifyPassword = require('./verifyPassword.middleware');
const verifyToken = require('./verifyToken');

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyToken,
};