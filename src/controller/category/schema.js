const Joi = require('joi');

const createSchema = {
  name: Joi.string().required().label('Name'),
  slug: Joi.string().required().label('Slug'),
  description: Joi.string().optional().label('Description'),
  images: Joi.array().items(Joi.object({
    name: Joi.string().label('Image Name'),
    url: Joi.string().label('Image URL'),
    default: Joi.boolean().label('Image Flag'),
  })).optional().label('Images'),
  parentId: Joi.string().min(24).max(24).optional()
    .label('Parent Id'),
  sequence: Joi.number().optional().label('Sequence Number'),
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
  parentId: Joi.string().min(24).max(24).optional()
    .label('Parent Id'),
  sequence: Joi.number().optional().label('Sequence Number'),
};

module.exports = {
  createSchema,
  editSchema,
};
