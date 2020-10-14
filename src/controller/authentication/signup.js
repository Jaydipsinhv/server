const moment = require('moment');
const UserModel = require('../user/user.model');
const { jwtSignUser } = require('./helper');
const { setValue } = require('../../lib/redis');

const signup = async (req, res) => {
  try {
    let existingEmail = await UserModel.findOne({
      email: req.body.email,
      isActive: true,
      isDeleted: false,
    });
    if (existingEmail && existingEmail.password) {
      return req.sendResponse(409, 'Email already exists.');
    }
    let userJson;
    if (existingEmail && !existingEmail.password) {
      existingEmail = Object.assign(existingEmail, req.body);
      userJson = await existingEmail.save();
    } else {
      const creatUser = new UserModel(req.body);
      userJson = await creatUser.save();
    }
    userJson = userJson.toJSON();

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
      message: 'Awesome! user registered successfully',
    });
  } catch (err) {
    return req.sendResponse(500, err);
  }
};

module.exports = signup;
