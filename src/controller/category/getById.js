const CategoryModel = require('./category.model');

const getById = async (req) => {
  try {
    const existingCategory = await CategoryModel.findOne({ _id: req.params.categoryId });
    if (!existingCategory) {
      return req.sendResponse(404, 'Category not exists.');
    }

    req.sendResponse(200, existingCategory);
  } catch (err) {
    req.sendResponse(500, err);
  }
};

module.exports = getById;
