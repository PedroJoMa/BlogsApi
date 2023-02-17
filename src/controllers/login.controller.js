const { loginService } = require('../services');
const { statusCodes, mapStatus } = require('../statusCodes');

const create = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await loginService.create(email, password);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.OK).json({ token: message });
};

module.exports = {
  create,
};