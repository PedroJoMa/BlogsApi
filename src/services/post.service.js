const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { BlogPost, User, Category } = require('../models');
const { 
  validateNewPost, validateId,
} = require('./validations/validationsInputValues');

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

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

const update = async (id, token, { title, content }) => {
  const { email } = await jwt.verify(token, secret);
  const { dataValues } = await User.findOne({ where: { email } });
  const postUpdate = await getById(id);

  if (postUpdate.message.userId !== dataValues.id) {
    return { type: 'NOT_FOUND', message: 'Unauthorized user' };
  }

  await BlogPost.update(
    { title, content },
    {
      where: { id },
    },
  );

  const updatedPost = await getById(id);

  return { type: '', message: updatedPost.message };
};

module.exports = {
  insert,
  getAll,
  getById,
  update,
};