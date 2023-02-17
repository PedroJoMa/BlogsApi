const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { statusCode } = require('../utils/errorMap');
const { BlogPost, User, Category, PostCategory } = require('../models');

dotenv.config();
const secret = process.env.JWT_SECRET || 'secret';

async function selectAllPosts() {
  const posts = await BlogPost.findAll({ include:
    [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { status: statusCode.OK, message: posts };
}

async function selectByIdPost(id) {
  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return { status: statusCode.NOT_FOUND, message: { message: 'Post does not exist' } };

  return { status: statusCode.OK, message: post };
}

async function updateByIdPost(id, token, title, content) {
  const { data } = await jwt.verify(token, secret);
  const { dataValues } = await User.findOne({ where: { email: data } });
  const postUpdate = await selectByIdPost(id);

  if (postUpdate.message.userId !== dataValues.id) {
    return { status: statusCode.UNAUTHORIZED, message: { message: 'Unauthorized user' } };
  }

  await BlogPost.update(
    { title, content },
    {
      where: { id },
    },
  );

  const { message } = await selectByIdPost(id);

  return { status: statusCode.OK, message };
}

async function searchByQuery(q) {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        {
          title: {
              [Op.like]: `%${q}%` },
        },
        {
          content: { [Op.like]: `%${q}%` },
        },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
}

const formatPost = (obj) => ({
  id: obj.id,
  title: obj.title,
  content: obj.content,
  userId: obj.userId,
  updated: obj.updated,
  published: obj.published,
});

async function createPost({ title, content, categoryIds }, id) {
  const newPost = await BlogPost.create({
    title, content, categoryId: categoryIds, userId: id,
  });

  const formatedPost = formatPost(newPost);

  await categoryIds.map((element) => PostCategory.create({
    postId: formatedPost.id, categoryId: element,
  }));

  return formatedPost;
}

async function selectAllPostsQuery(q) {
  try {
    const posts = await BlogPost.findAll(
    { where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include:
    [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    },
);
return { type: null, message: posts };
} catch (e) {
  return { type: 500, message: e.message };
}
}

module.exports = {
  selectAllPosts,
  selectByIdPost,
  updateByIdPost,
  searchByQuery,
  createPost,
  formatPost,
  selectAllPostsQuery,
};