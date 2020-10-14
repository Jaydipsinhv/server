const moment = require('moment');
const { setValue } = require('../../../lib/redis');
const { jwtSignUser } = require('../helper');

async function facebookSignup(req, res) {
  try {
    delete req.user.password;
    delete req.user.createdAt;
    delete req.user.updatedAt;
    delete req.user.__v;

    const generatedToken = jwtSignUser({ _id: req.user._id, email: req.user.email });

    // set Redis key,value pair with generated token for manage token validity
    await setValue(`auth:${generatedToken}`, `${moment().add(process.env.TOKEN_EXPIRE_IN, 'seconds')}`, process.env.TOKEN_EXPIRE_IN);

    res.cookie('token', generatedToken);
    return res.redirect(`${process.env.APP_URL}#token=${generatedToken}`);
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = facebookSignup;
