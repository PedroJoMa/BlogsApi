const { 
  validateLogin,
  validateUser,
  validateCategory,
  validatePost,
  validateFieldId,
  validateUpdateFields,
} = require('./schemas');

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

  if (error) return { type: 'INVALID_FIELDS', message: '"name" is required' };

  return { type: '', message: '' };
};

const validateNewPost = (title, content, categoryIds) => {
  const { error } = validatePost
    .validate({ title, content, categoryIds });
  
  if (error) return { type: 'INVALID_FIELDS', message: error.message };

  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = validateFieldId.validate(id);

  if (error) return { type: 'NOT_EXIST', message: error.message };

  return { type: null, message: '' };
};

const validateUpdateValues = (title, content) => {
  const { error } = validateUpdateFields.validate({ title, content });

  if (error) return { type: 'INVALID_FIELDS', message: 'Some required fields are missing' };

  return { type: null, message: '' };
};

module.exports = {
  validateNewLogin,
  validateNewUser,
  validateName,
  validateNewPost,
  validateId,
  validateUpdateValues,
};