const Joi = require('joi');

const createSchema = {
  name: Joi.string().required().label('Name'),
  description: Joi.string().required().label('Description'),
  images: Joi.array().items(Joi.object({
    name: Joi.string().label('Image Name'),
    url: Joi.string().label('Image URL'),
    default: Joi.boolean().label('Image Flag'),
  })).optional().label('Images'),
};

const editSchema = {
  name: Joi.string().optional().label('Name'),
  description: Joi.string().optional().label('Description'),
  images: Joi.array().items(Joi.object({
    name: Joi.string().label('Image Name'),
    url: Joi.string().label('Image URL'),
    default: Joi.boolean().label('Image Flag'),
  })).optional().label('Images'),
  isActive: Joi.boolean().optional().label('Is Active'),
  isDeleted: Joi.boolean().optional().label('Is Deleted'),
};

module.exports = {
  createSchema,
  editSchema,
};
