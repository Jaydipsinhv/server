const CategoryModel = require('./category.model');

const get = async (req) => {
  try {
    const limit = parseInt(req.query.limit || process.env.LIMIT || 10);
    const skip = ((req.query.page ? (req.query.page - 1) : 0) * limit);

    const filter = {
      isActive: true,
      isDeleted: false,
    };

    if (req.query.searching) {
      const regex = req.query.searching.split(' ').join('|');
      filter.name = { $regex: regex, $options: '$i' };
    }

    let sortBy = { _id: -1 };
    if (req.query.sort && req.query.sort.indexOf(',') >= 0) {
      const sortArray = req.query.sort.split(',');
      sortBy = { [sortArray[0]]: sortArray[1] };
    }

    const count = await CategoryModel.count(filter);
    const data = await CategoryModel.find(filter)
      .sort(sortBy).skip(skip).limit(limit);

    req.sendResponse(200, { count, data });
  } catch (err) {
    req.sendResponse(500, err);
  }
};

module.exports = get;
