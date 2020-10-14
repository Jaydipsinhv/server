/**
 *  passport middleware which can call on every request to validate token based on
 *  last seen time stored in Redis server. default jwt expiration was ignore by config
 *  and implemented own logic for validate token time - JD
 */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const moment = require('moment');

const UserModel = require('../../controller/user/user.model');
const { getValue, setValue, deleteKey } = require('../redis');

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: true,
    passReqToCallback: true,
  },
  (async (req, jwtPayload, done) => {
    try {
      let token = req.headers.authorization;
      token = token.split(' ')[1];

      // get last seen with token and validate token expired or not
      const lastSeen = await getValue(`auth:${token}`);
      const totalDiff = moment(new Date(lastSeen)).diff(moment(), 'seconds');

      if (totalDiff < 0) {
        await deleteKey(`auth:${token}`);
        return done('Token Expired', false);
      }

      const user = await UserModel.findOne({ _id: jwtPayload._id });
      if (!user) {
        return done('User not exists.', false);
      }

      // set new validity of the token
      await setValue(`auth:${token}`, `${moment().add(process.env.TOKEN_EXPIRE_IN, 'seconds')}`, process.env.TOKEN_EXPIRE_IN);
      return done(null, user);
    } catch (err) {
      return done('Error while checking authentication.', false);
    }
  })),
);

module.exports = null;
