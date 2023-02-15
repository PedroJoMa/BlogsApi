const { validateLogin, validateUser } = require('./schemas');

const validateNewLogin = (email, password) => {
  const { error } = validateLogin
    .validate({ email, password });

  if (error) {
    return { type: 'INVALID_FIELDS', message: error.message };
  }
  return { type: null, message: '' };
};

const validateNewUser = (displayName, email, password, image) => {
  const { error } = validateUser
    .validate({ displayName, email, password, image });

    if (error) {
      return { type: 'INVALID_FIELDS', message: error.message };
    }

    return { type: null, message: '' };
};

module.exports = {
  validateNewLogin,
  validateNewUser,
};