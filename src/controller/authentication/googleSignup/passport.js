const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  (async (accessToken, refreshToken, profile, done) => {
    try {
      let userJson = await User.findOne({ email: profile.emails[0].value });
      if (userJson) {
        if ((userJson.provider || []).indexOf('google') === -1) {
          userJson.provider = userJson.provider || [];
          userJson.provider.push('google');
        }
        userJson = await User.findAndUpdate({ _id: userJson._id }, { provider: userJson.provider });
      } else {
        const userData = {
          email: profile._json.email,
          firstName: profile._json.first_name,
          lastName: profile._json.last_name,
          provider: 'google',
        };
        const user = new User(userData);
        userJson = await user.save();
      }
      return done(null, userJson);
    } catch (error) {
      return done(error, null);
    }
  })));
};
