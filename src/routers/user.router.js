const express = require('express');
const { userController } = require('../controllers');
const { verifyToken } = require('../middlewares');

const router = express.Router();

router.post(
  '/',
  userController.create,
);

router.get(
  '/',
  verifyToken,
  userController.getAll,
);

router.get(
  '/:id',
  verifyToken,
  userController.getById,
);

module.exports = router;