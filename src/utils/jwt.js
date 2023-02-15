const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

const createToken = (data) => {
  const token = Jwt.sign(data, secret);

  return token;
};

module.exports = {
  createToken,
};