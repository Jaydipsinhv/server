const UserModel = require('./user.model');

async function get(req) {
  const existingUser = await UserModel.findOne({ email: req.user.email }).lean();

  delete existingUser.password;
  delete existingUser.createdAt;
  delete existingUser.updatedAt;
  delete existingUser.__v;

  return req.sendResponse(200, existingUser);
}

module.exports = get;
