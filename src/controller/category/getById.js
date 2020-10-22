const CategoryModel = require('./category.model');

const getById = async (req) => {
  const existingCategory = await CategoryModel.findOne({ _id: req.params.categoryId });
  if (!existingCategory) {
    return req.sendResponse(404, 'Category does not exists.');
  }

  return req.sendResponse(200, existingCategory);
};

module.exports = getById;
