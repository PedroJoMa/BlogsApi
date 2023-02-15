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

module.exports = {
  create,
};