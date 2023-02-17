const { validateNewLogin } = require('./validations/validationsInputValues');
const { User } = require('../models');
const { createToken } = require('../utils/jwt');

const create = async (email, password) => {
  const error = validateNewLogin(email, password);
  const loginExists = await User.findOne({
    where: { email, password },
  });

  if (error.type) return error;

  if (!loginExists) return { type: 'INVALID_FIELDS', message: 'Invalid fields' };

  const id = { id: loginExists.id };

  const token = createToken(id);

  return { type: null, message: token };
};

module.exports = {
  create,
};
