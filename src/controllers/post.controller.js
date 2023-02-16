const { postService } = require('../services');
const { statusCodes, mapStatus } = require('../statusCodes');

const insert = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const { type, message } = await postService.insert(title, content, categoryIds);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.CREATED).json(message);
};

const getAll = async (_req, res) => {
  const posts = postService.getAll();

  return res.status(statusCodes.OK).json(posts);
};

module.exports = {
  insert,
  getAll,
};