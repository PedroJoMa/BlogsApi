const { postService } = require('../services');
const { statusCodes, mapStatus } = require('../statusCodes');

const insert = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const { type, message } = await postService.insert(title, content, categoryIds);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.CREATED).json(message);
};

const getAll = async (_req, res) => {
  const posts = await postService.getAll();

  return res.status(statusCodes.OK).json(posts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.getById(id);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.OK).json(message);
};

module.exports = {
  insert,
  getAll,
  getById,
};