const Jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { statusCodes } = require('../statusCodes');

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
    if (!token) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'Token not found' });
    }
  
    try {
      const decryptToken = Jwt.verify(token, secret);
      res.locals.user = decryptToken;
      next();
    } catch (err) {
      return res.status(statusCodes.NOT_FOUND).json({ message: 'Expired or invalid token' });
    }
};