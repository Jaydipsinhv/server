const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../user/user.model');

const resetPassword = async (req) => {
  try {
    let decoded;

    try {
      // validate token if token is not valid then response with 401 unauthorized
      decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
    } catch (err) {
      return req.sendResponse(401, 'Invalid token.');
    }

    // If token is valid then find user from database based on token
    if (decoded && decoded.email) {
      const user = await UserModel.findOne(
        {
          email: decoded.email,
          reset_password_token: req.body.token,
          isActive: true,
          isDeleted: false,
        },
      );

      if (!user) {
        return req.sendResponse(403, 'Token has been already used.');
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      await UserModel.findAndUpdate({ _id: user._id }, { resetPasswordToken: '', password: hash });

      return req.sendResponse(200, 'Password changed successfully.');
    }
    return req.sendResponse(422, 'Password reset token is expired.');
  } catch (err) {
    return req.sendResponse(500, err);
  }
};

module.exports = resetPassword;
