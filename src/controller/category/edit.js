const CategoryModel = require('./category.model');

const create = async (req) => {
  if (req.body.name) {
    const validateName = await CategoryModel.findOne({
      name: { $regex: req.body.name, $options: '$i' }, _id: { $ne: req.params.categoryId },
    });
    if (validateName) {
      return req.sendResponse(422, 'Category name must be unique.');
    }
  }

  let existingCategory = await CategoryModel.findOne({ _id: req.params.categoryId });
  if (!existingCategory) {
    return req.sendResponse(404, 'Category not exists.');
  }

  existingCategory = Object.assign(existingCategory, req.body);
  await existingCategory.save();

  return req.sendResponse(200, { message: 'Category updated successfully' });
};

module.exports = create;
