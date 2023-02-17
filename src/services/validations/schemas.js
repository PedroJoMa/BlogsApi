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

const validateCategory = Joi.string().required();

const validatePost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()),
});

const validateFieldId = Joi.number().required();

const validateUpdateFields = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  validateLogin,
  validateUser,
  validateCategory,
  validatePost,
  validateFieldId,
  validateUpdateFields,
};
