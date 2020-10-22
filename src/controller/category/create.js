const CategoryModel = require('./category.model');

const create = async (req) => {
  const existingCategory = await CategoryModel.findOne({ name: { $regex: req.body.name, $options: '$i' } });
  if (existingCategory) {
    return req.sendResponse(422, 'Category name must be unique');
  }

  const category = new CategoryModel(req.body);
  await category.save();

  return req.sendResponse(201, { message: 'Category created successfully' });
};

module.exports = create;
