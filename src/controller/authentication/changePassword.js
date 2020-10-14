const UserModel = require('../user/user.model');

const changePassword = async (req) => {
  try {
    const existingUser = await UserModel.findOne({ _id: req.user._id, isActive: true, isDeleted: false }).select('+password');
    const { oldPassword, newPassword } = req.body;
    const isPasswordValid = await UserModel.comparePassword(oldPassword, existingUser.password);
    if (!isPasswordValid) {
      return req.sendResponse(403, 'Current password is incorrect.');
    }
    existingUser.password = newPassword;

    await existingUser.save();

    return req.sendResponse(200, 'Password changed successfully.');
  } catch (err) {
    return req.sendResponse(500, err);
  }
};

module.exports = changePassword;
