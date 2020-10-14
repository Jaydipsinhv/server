const asyncMiddleware = require('../../lib/async-middleware');

module.exports = {
  get: asyncMiddleware(require('./get')),
};
