const express = require('express');
const validateData = require('../middlewares');
const { loginController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  validateData.verifyEmail,
  validateData.verifyPassword,
  loginController.create,
);

module.exports = router;