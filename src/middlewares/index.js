const verifyEmail = require('./verifyEmail.middleware');
const verifyPassword = require('./verifyPassword.middleware');
const verifyToken = require('./verifyToken');
const verifyPostFilds = require('./verifyPostFields');

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyToken,
  verifyPostFilds,
};