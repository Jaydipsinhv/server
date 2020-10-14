const jwt = require('jsonwebtoken');

const jwtSignUser = (user) => {
  const ONE_WEEK = process.env.TOKEN_EXPIRE_IN;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK,
  });
};

const jwtSignForgetPasswordToken = (object) => jwt.sign(object, process.env.JWT_SECRET, {
  expiresIn: '24h',
});

module.exports = {
  jwtSignUser,
  jwtSignForgetPasswordToken,
};
