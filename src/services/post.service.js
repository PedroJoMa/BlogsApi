const { BlogPost, User, Category } = require('../models');
const { validateNewPost } = require('./validations/validationsInputValues');

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
  console.log(posts);
  return posts;
};

module.exports = {
  insert,
  getAll,
};