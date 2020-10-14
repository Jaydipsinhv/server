const passport = require('passport');

const FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User) {
  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      passReqToCallback: true,
      profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name'],
    },
    (async (req, accessToken, refreshToken, profile, done) => {
      try {
        let userJson = await User.findOne({ email: profile.emails[0].value });
        if (userJson) {
          if ((userJson.provider || []).indexOf('facebook') === -1) {
            userJson.provider = userJson.provider || [];
            userJson.provider.push('facebook');
          }
          userJson = await User.findAndUpdate(
            { _id: userJson._id }, { provider: userJson.provider },
          );
        } else {
          const userData = {
            email: profile._json.email,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name,
            provider: 'facebook',
          };
          const user = new User(userData);
          userJson = await user.save();
        }
        return done(null, userJson);
      } catch (error) {
        return done(error);
      }
    })),
  );
};
