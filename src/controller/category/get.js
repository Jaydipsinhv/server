const CategoryModel = require('./category.model');

const get = async (req) => {
  const filter = {
    isActive: true,
    isDeleted: false,
    parentId: { $exists: false },
  };
  const projection = {
    name: 1, sequence: 1, subCategory: 1, _id: 0, slug: 1,
  };
  const sort = { sequence: 1 };
  const getSubCategory = {
    as: 'subCategory',
    from: 'categories',
    let: {
      categoryId: '$_id',
    },
    pipeline: [{
      $match: {
        $or: [
          { $expr: { $eq: ['$parentId', '$$categoryId'] } },
        ],
      },
    }, {
      $sort: sort,
    }, {
      $project: projection,
    }],
  };

  const data = await CategoryModel.aggregate([
    {
      $match: filter,
    },
    {
      $sort: sort,
    },
    {
      $lookup: {
        as: 'subCategory',
        from: 'categories',
        let: {
          categoryId: '$_id',
        },
        pipeline: [{
          $match: {
            $or: [
              { $expr: { $eq: ['$parentId', '$$categoryId'] } },
            ],
          },
        }, {
          $sort: sort,
        }, {
          $lookup: getSubCategory,
        }, {
          $project: projection,
        }],
      },
    }, {
      $project: projection,
    },
  ]);
  return req.sendResponse(200, data);
};

module.exports = get;
