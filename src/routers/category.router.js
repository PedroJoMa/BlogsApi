const express = require('express');
const { verifyToken } = require('../middlewares');
const { categoryController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  verifyToken,
  categoryController.create,
);

module.exports = router;