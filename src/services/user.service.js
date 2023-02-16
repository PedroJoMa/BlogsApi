const { validateNewUser } = require('./validations/validationsInputValues');
const { User } = require('../models');

const create = async (displayName, email, password, image) => {
  const error = validateNewUser(displayName, email, password, image);
  const userExists = await User.findAll({ 
    where: { email },
  });

  console.log(userExists);

  if (error.type) return error;

  if (userExists.length > 0) {
    return { type: 'ALREADY_CREATED', message: 'User already registered' };
  }

  const newUser = await User.create({ displayName, email, password, image });

  return { type: '', message: newUser };
};

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] }, // { attributes: { exclude: ['password'] } } exclui 'password' do retorno
  });

  return { type: 'OK', message: users };
};

module.exports = {
  create,
  getAll,
};