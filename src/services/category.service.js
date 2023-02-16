const { Category } = require('../models');
const { validateName } = require('./validations/validationsInputValues');

const insert = async (name) => {
  const error = validateName(name);

  if (error.type) return error;
  await Category.create({ name });

  const newCategory = await Category.findOne({
    where: { name },
  });

  if (!newCategory) return { type: 'NOT_EXIST', message: 'Name does not exist' };

  return { type: null, message: newCategory };
};

module.exports = {
  insert,
};