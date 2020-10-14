const express = require('express');
// const passport = require('passport');

const router = express.Router();

const validator = require('../../lib/validator/validator');
const isAuthenticated = require('../../lib/auth/isAuthenticated');
const authController = require('../../controller/authentication');
const schemas = require('../../controller/authentication/schema');
// const User = require('../../controller/user/user.model');


// const REQUIRED_SCOPES = ['email'];
// const USE_SESSION = true;

// require('../../controller/authentication/facebookSignup/passport').setup(User);
// require('../../controller/authentication/googleSignup/passport').setup(User);

router.post('/signup', validator(schemas.signupSchema), authController.signup);

/* router.get('/signup/facebook', passport.authenticate('facebook', {
  scope: REQUIRED_SCOPES,
  session: USE_SESSION,
}));
router.get('/signup/facebook/callback',
  passport.authenticate('facebook'),
  authController.facebookSignup);
router.get('/signup/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  session: USE_SESSION,
}));
router.get('/signup/google/callback', passport.authenticate('google'), authController.googleSignup);
*/
router.post('/login', validator(schemas.loginSchema), authController.login);
router.post('/forgot-password', validator(schemas.forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validator(schemas.resetPasswordSchema), authController.resetPassword);
router.patch('/change-password', isAuthenticated, validator(schemas.changePassword), authController.changePassword);
router.post('/logout', isAuthenticated, authController.logout);

module.exports = router;
