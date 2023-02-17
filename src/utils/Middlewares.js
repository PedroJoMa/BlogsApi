const JWT = require('jsonwebtoken');
const { errorMessages, statusCode } = require('./errorMap');
// const { User } = require('../models');

async function loginValidation(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password || email.length === 0 || password.length === 0) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.MISSING_FIELDS });
  }

  return next();
}

async function displayNameValidation(req, res, next) {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.SHORT_DISPLAY_NAME });
  }

  return next();
}

async function emailValidation(req, res, next) {
  const { email } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email || !emailRegex.test(email)) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.INVALID_EMAIL });
  }

  return next();
}

async function passwordValidation(req, res, next) {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.SHORT_PASSWORD });
  }

  return next();
}

async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.MISSING_TOKEN });
  }

  try {
    JWT.verify(authorization, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: errorMessages.INVALID_TOKEN });
  }

  return next();
}

async function categoryNameValidation(req, res, next) {
  const { name } = req.body;

  if (!name || name.length === 0) {
    return res.status(statusCode.BAD_REQUEST).json({ message: errorMessages.MISSING_NAME });
  }
  
  return next();
}

async function idValidation(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(statusCode.NOT_FOUND)
      .json({ message: errorMessages.INVALID_ID });
  }
  return next();
}

async function updatePostFieldsValidations(req, res, next) {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
}

module.exports = {
  loginValidation,
  displayNameValidation,
  emailValidation,
  passwordValidation,
  tokenValidation,
  categoryNameValidation,
  idValidation,
  updatePostFieldsValidations,
};