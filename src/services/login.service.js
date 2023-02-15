const { validateNewLogin } = require('./validations/validationsInputValues');
const { User } = require('../models');

const create = async (email, password) => {
  const error = validateNewLogin(email, password);
  const loginExists = await User.findAll({
    where: { email },
  });

  if (error.type) return error;

  if (loginExists.length === 0) return { type: 'INVALID_FIELDS', message: 'Invalid fields' };

  return { type: null, message: '' };
};

module.exports = {
  create,
};
