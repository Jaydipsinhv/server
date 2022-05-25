const UserModel = require('../user/user.model');
const { jwtSignForgetPasswordToken } = require('./helper');
const emailProvider = require('../../lib/email');

const forgetPassword = async (req) => {
  const user = await UserModel.findOne({
    email: req.body.email,
    isActive: true,
    isDeleted: false,
  });
  if (!user) {
    return req.sendResponse(403, 'User does not exists.');
  }

  await UserModel.findAndUpdate(
    { _id: user._id },
    { resetPasswordToken: jwtSignForgetPasswordToken({ email: user.email }) },
  );
  const updatedUser = await UserModel.findOne({ _id: user._id })
    .select({ resetPasswordToken: 1, email: 1 });

  const option = {
    resetPasswordLink: `${process.env.APP_URL}/reset-password/${updatedUser.resetPasswordToken}`,
  };

  await emailProvider.sendEmail(updatedUser.email, 'Password reset instructions', 'forgotPassword', option);
  return req.sendResponse(200, `Email sent successfully to ${user.email}`);
};

module.exports = forgetPassword;
