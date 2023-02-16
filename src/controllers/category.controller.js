const { statusCodes, mapStatus } = require('../statusCodes');
const { categoryService } = require('../services');

const create = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await categoryService.insert(name);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.CREATED).json(message);
};

module.exports = {
  create,
};