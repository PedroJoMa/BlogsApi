const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const services = require('../services/posts.service');
const { Category, User } = require('../models');

dotenv.config();
const secret = process.env.JWT_SECRET || 'secret';

async function selectAllPosts(_req, res) {
  const result = await services.selectAllPosts();
  res.status(result.status).json(result.message);
}

async function selectByIdPost(req, res) {
  const { id } = req.params;
  const result = await services.selectByIdPost(id);

  res.status(result.status).json(result.message);
}

async function updateByIdPost(req, res) {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const { id } = req.params;
  const result = await services.updateByIdPost(id, token, title, content);

  res.status(result.status).json(result.message);
}

async function searchByQuery(req, res) {
  const { q } = req.query;
     if (!q.length) {
    const { type, message } = await services.selectAllPosts();
         if (type) return res.status(type).json({ message });
              return res.status(200).json(message);   
          } 
          const { type, message } = await services.selectAllPostsQuery(q);
             if (type) return res.status(type).json({ message });
                 return res.status(200).json(message);
}

async function createPost(req, res) {
  const token = req.headers.authorization;
  const { data } = await jwt.verify(token, secret);
  const { dataValues } = await User.findOne({ where: { email: data } });
  const { title, content, categoryIds } = req.body;
  const verifyCategory = await Category.findAll({ where: { id: categoryIds } });

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (verifyCategory.length < categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = await services.createPost(req.body, dataValues.id);
  return res.status(201).json(newPost);
}

module.exports = {
  selectAllPosts,
  selectByIdPost,
  updateByIdPost,
  searchByQuery,
  createPost,
};
