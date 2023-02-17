const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

const createToken = (data) => {
  const token = Jwt.sign(data, secret);

  return token;
};

const decryptToken = (token) => {
  const decryptedToken = Jwt.verify(token, secret);

  return decryptedToken;
};

module.exports = {
  createToken,
  decryptToken,
};