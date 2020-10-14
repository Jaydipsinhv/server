const CategoryModel = require('./category.model');

const create = async (req) => {
  if (req.body.name) {
    const validateName = await CategoryModel.findOne({
      name: undefined, _id: { $ne: req.params.categoryId },
    });
    if (validateName) {
      return req.sendResponse(422, 'Category name must be unique.');
    }
  }

  let category = await CategoryModel.findOne({ _id: req.params.categoryId });
  if (!category) {
    return req.sendResponse(404, 'Category not exists.');
  }

  category = Object.assign(category, req.body);
  await category.save();

  return req.sendResponse(201, { message: 'Category updated successfully', _id: category._id, images: category.images });
};

module.exports = create;
