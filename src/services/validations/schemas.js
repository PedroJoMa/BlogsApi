const Joi = require('joi');

const validateLogin = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().alphanum().required(),
});

const validateUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().alphanum().min(6).required(),
  image: Joi.string(),
});

module.exports = {
  validateLogin,
  validateUser,
};