const { loginService } = require('../services');
const { statusCodes, mapStatus } = require('../statusCodes');
const { createToken } = require('../utils/jwt');

const create = async (req, res) => {
  const { email, password } = req.body;
  const token = createToken({ email });
  
  const { type, message } = await loginService.create(email, password);

  if (type) return res.status(mapStatus(type)).json({ message });

  return res.status(statusCodes.OK).json({ token });
};

module.exports = {
  create,
};