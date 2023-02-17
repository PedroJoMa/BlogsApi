const express = require('express');
const controller = require('../controllers/posts.controller');
const middlewares = require('../utils/Middlewares');

const router = express.Router();

router.get(
  '/', 
  middlewares.tokenValidation, 
  controller.selectAllPosts,
);

router.get(
  '/search',
  middlewares.tokenValidation,
  controller.searchByQuery,
);

router.get(
  '/:id', 
  middlewares.tokenValidation,
  controller.selectByIdPost,
  );
  
router.put(
  '/:id', 
  middlewares.tokenValidation,
  middlewares.updatePostFieldsValidations,
  controller.updateByIdPost,
);

router.post(
  '/',
  middlewares.tokenValidation,
  controller.createPost,
);

module.exports = router;