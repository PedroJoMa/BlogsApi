const { Category } = require('../models');
const { validateName } = require('./validations/validationsInputValues');

const create = async (name) => {
  const error = validateName(name);
  const newCategory = await Category.create({ name });
  
  if (error.type) return error;

  return { type: null, message: newCategory };
};

module.exports = {
  create,
};