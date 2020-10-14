const Joi = require('joi');

const schema = {
  moduleType: Joi.string().label('Module type').required(),
  moduleId: Joi.string().label('Module id').required(),
  imageIds: Joi.string().label('Image Ids').required(),
  options: Joi.boolean().label('Options').optional(),
};

const deleteSchema = {
  moduleType: Joi.string().label('Module type').required(),
  moduleId: Joi.string().label('Module id').required(),
};

module.exports = {
  schema,
  deleteSchema,
};
