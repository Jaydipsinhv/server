const Joi = require('joi');

const signupSchema = {
  profileImage: Joi.array().items(Joi.object({
    original: Joi.string().optional().allow(['', null]).label('Profile Original'),
    thumb: Joi.string().optional().allow(['', null]).label('Profile Thumb'),
  })).optional().label('Profile Image'),
  email: Joi.string()
    .email()
    .label('Email')
    .required()
    .options({
      language: {
        any: { required: 'is required.' },
        string: { email: 'should be valid email address.' },
      },
    }),
  firstName: Joi.string().required()
    .label('First name'),
  lastName: Joi.string().required()
    .label('Last name'),
  password: Joi.string().required()
    .min(5, 'utf8')
    .label('Password'),
};

const loginSchema = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};

const forgotPasswordSchema = {
  email: Joi.string().required(),
};

const resetPasswordSchema = {
  token: Joi.string().required(),
  password: Joi.string().required(),
};

const changePassword = {
  oldPassword: Joi.string().required().label('Old Password'),
  newPassword: Joi.string().required().label('New Password'),
};

module.exports = {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePassword,
};
