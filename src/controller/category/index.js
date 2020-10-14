const asyncMiddleware = require('../../lib/async-middleware');

module.exports = {
  create: asyncMiddleware(require('./create')),
  edit: asyncMiddleware(require('./edit')),
  get: asyncMiddleware(require('./get')),
  getAll: require('./getAll'),
  getById: asyncMiddleware(require('./getById')),
};
