const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { errorMessages, statusCode } = require('../utils/errorMap');
const { createToken } = require('../utils/JWT');
const { User } = require('../models');

dotenv.config();
const secret = process.env.JWT_SECRET || 'secret';

async function insertUser(body) {
  const { email } = body;
  
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { status: statusCode.CONFLICT, message: { message: errorMessages.EXISTING_USER } };
  }

  await User.create(body);

  const token = createToken(email);
  return { status: statusCode.CREATED, message: { token } };
}

async function selectAllUsers() {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: statusCode.OK, message: users };
}

async function selectUserById(id) {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    return { status: statusCode.NOT_FOUND, message: { message: errorMessages.USER_NOT_FOUND } };
  }

  return { status: statusCode.OK, message: user };
}

async function deleteUser(token) {
  const { data } = await jwt.verify(token, secret);
  const { dataValues } = await User.findOne({ where: { email: data } });
  await User.destroy(
    { where: { id: dataValues.id } },
  );
}

module.exports = {
  insertUser,
  selectAllUsers,
  selectUserById,
  deleteUser,
};
