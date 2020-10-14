const UserModel = require('./user.model');

async function get(req) {
  try {
    const existingUser = await UserModel.findOne({ email: req.user.email }).lean();

    delete existingUser.password;
    delete existingUser.createdAt;
    delete existingUser.updatedAt;
    delete existingUser.__v;

    return req.sendResponse(200, existingUser);
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = get;
