const passport = require('passport');

const excludeAuthentication = ['/signup/facebook', '/signup/facebook/callback'];
module.exports = (req, res, next) => {
  const authorizeToken = req.headers.authorization;
  // if request does not have token and it include in exclude validation route then allow
  // to execute normal flow of the request
  if (req.path && excludeAuthentication.indexOf(req.path) >= 0 && !authorizeToken) {
    next();
  } else {
    // for every request having token, it should have valid token. if it has token and token
    // was expired then throw unauthorized.
    // to acess public route no need to add token in request headers
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        res.status(401).send({
          error: 'you do not have access to this resource',
        });
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
  }
};
