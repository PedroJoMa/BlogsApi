const express = require('express');
const { verifyToken } = require('../middlewares');
const { categoryController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  verifyToken,
  categoryController.create,
);

router.get(
  '/',
  verifyToken,
  categoryController.getAll,
);

module.exports = router;