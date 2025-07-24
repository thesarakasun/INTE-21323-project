const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'teacher').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const passwordResetSchema = Joi.object({
  password: Joi.string().min(6).required(),
});

const courseSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
});

module.exports = { registerSchema, loginSchema, emailSchema, passwordResetSchema, courseSchema };