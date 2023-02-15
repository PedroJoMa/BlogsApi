const { validateLogin } = require('./schemas');

const validateNewLogin = (email, password) => {
  const { error } = validateLogin
    .validate({ email, password });

  if (error) {
    console.log('tem erro');
    console.log('');
    console.log('');
    console.log('');
    return { type: 'FIELDS_MISSING', message: error.message };
  }
    console.log('passou');
    console.log('');
    console.log('');
    console.log('');
  return { type: null, message: '' };
};

module.exports = {
  validateNewLogin,
};