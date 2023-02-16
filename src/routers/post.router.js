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

module.exports = router;