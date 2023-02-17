const { userService } = require('../services');
const { statusCodes, mapStatus } = require('../statusCodes');
const { createToken } = require('../utils/jwt');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = createToken(email);

  const { type, message } = await userService.create(displayName, email, password, image);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.CREATED).json({ token });
};

const getAll = async (_req, res) => {
  const { type, message } = await userService.getAll();

  return res.status(mapStatus(type)).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await userService.getById(id);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.OK).json(message);
};

module.exports = {
  create,
  getAll,
  getById,
};