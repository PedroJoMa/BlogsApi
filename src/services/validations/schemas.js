const Joi = require('joi');

const validateLogin = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().alphanum().required(),
});

module.exports = {
  validateLogin,
};