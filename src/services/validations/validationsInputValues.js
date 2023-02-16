const { validateLogin, validateUser, validateCategory } = require('./schemas');

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

const validateName = (name) => {
  const { error } = validateCategory.validate(name);

  if (error) return { type: 'INVALID_FIELDS', message: error.message };

  return { type: '', message: '' };
};

module.exports = {
  validateNewLogin,
  validateNewUser,
  validateName,
};