const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one letter, one number, and one special character (!@#$%^&*)',
    }),
  role: Joi.string().valid('student', 'teacher').required(),
});

// ... the rest of the schemas remain the same
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