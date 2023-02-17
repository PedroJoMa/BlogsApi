const express = require('express');
const { verifyToken, verifyPostFilds } = require('../middlewares');
const { postController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  verifyToken,
  postController.insert,
);

router.get(
  '/:id',
  verifyToken,
  postController.getById,
);

router.get(
  '/',
  verifyToken,
  postController.getAll,
);

router.put(
  '/:id',
  verifyToken,
  verifyPostFilds,
  postController.update,
);

module.exports = router;