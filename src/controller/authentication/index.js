const asyncMiddleware = require('../../lib/async-middleware');

module.exports = {
  signup: asyncMiddleware(require('./signup')),
  login: asyncMiddleware(require('./login')),
  forgotPassword: asyncMiddleware(require('./forgotPassword')),
  resetPassword: asyncMiddleware(require('./resetPassword')),
  changePassword: asyncMiddleware(require('./changePassword')),
  // facebookSignup: asyncMiddleware(require('./facebookSignup')),
  // googleSignup: asyncMiddleware(require('./googleSignup')),
  logout: asyncMiddleware(require('./logout')),
};
