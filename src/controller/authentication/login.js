const moment = require('moment');
const UserModel = require('../user/user.model');
const { setValue } = require('../../lib/redis');
const { jwtSignUser } = require('./helper');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userJson = await UserModel.findOne({ email, isActive: true, isDeleted: false }).select('+password').lean();
    if (!userJson) {
      return req.sendResponse(403, 'Email is incorrect.');
    }
    const isPasswordValid = await UserModel.comparePassword(password, userJson.password);
    if (!isPasswordValid) {
      return req.sendResponse(500, 'Password is incorrect.');
    }

    delete userJson.password;
    delete userJson.createdAt;
    delete userJson.updatedAt;
    delete userJson.__v;

    const generatedToken = jwtSignUser({ _id: userJson._id, email: userJson.email });

    // set Redis key,value pair with generated token for manage token validity
    await setValue(`auth:${generatedToken}`, `${moment().add(process.env.TOKEN_EXPIRE_IN, 'seconds')}`, process.env.TOKEN_EXPIRE_IN);
    res.cookie('token', generatedToken);
    return req.sendResponse(200, {
      user: userJson,
      token: generatedToken,
      message: `Welcome ${userJson.firstName}`,
    });
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = login;
