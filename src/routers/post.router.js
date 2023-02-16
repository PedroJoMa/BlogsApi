const express = require('express');
const { verifyToken } = require('../middlewares');
const { postController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  verifyToken,
  postController.insert,
);

router.get(
  '/',
  verifyToken,
  postController.getAll,
);

router.get(
  '/:id',
  verifyToken,
  postController.getById,
);

module.exports = router;