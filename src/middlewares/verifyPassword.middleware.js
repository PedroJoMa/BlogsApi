module.exports = (req, res, next) => {
  const { password } = req.body;

  if (!password) res.status(400).json({ message: 'Some required fields are missing' });

  next();
};