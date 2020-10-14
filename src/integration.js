/**
* exports the all the third party integration from here,
* so we can use those through out the application
* @name ./integration.js
* @author Jaydipsinh Vaghela <jaydip.vaghela@gmail.com>
*
* @version 0.0.1
*/

const Bugsnag = require('@bugsnag/js');
const BugsnagPluginExpress = require('@bugsnag/plugin-express');

Bugsnag.start({
  plugins: [BugsnagPluginExpress],
  apiKey: process.env.BUGSNAG_ID,
  appVersion: process.env.RELEASE_VERSION,
  filters: [
    '/^password$/i',
    '/^strategy$/i',
    '/^authorization$/i',
    '/^newPassword$/i',
    '/^oldPassword$/i',
  ],
});

const bugsnagMiddleware = Bugsnag.getPlugin('express');

module.exports = {
  bugsnagMiddleware,
};
