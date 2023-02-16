const { BlogPost, User, Category } = require('../models');
const { validateNewPost, validateId } = require('./validations/validationsInputValues');

const insert = async (title, content, categoryIds) => {
  const error = validateNewPost(title, content, categoryIds);
  const newPost = await BlogPost.create({ title, content, categoryIds });

  if (error.type) return error;

  return { type: '', message: newPost };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({ include:
    [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const error = validateId(id);
  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (error.type) return error;

  if (!post) return { type: 'NOT_EXIST', message: 'Post does not exist' };

  return { type: '', message: post };
};

module.exports = {
  insert,
  getAll,
  getById,
};