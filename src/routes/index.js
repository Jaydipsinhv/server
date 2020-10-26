const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./auth');
const userRoutes = require('./user');
const categoryRoutes = require('./category');
const mediaRoutes = require('./media');
const swaggerRoutes = require('./swagger');
const { sendResponse } = require('../lib/responseHandler');
// const isAuthenticated = require('../lib/auth/isAuthenticated');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('Education API running...!!!');
  });

  // add response handle method for all api endpoint and default bind req, res and next
  // to the response handler for later use.
  app.use((req, res, next) => {
    req.sendResponse = sendResponse.bind(null, req, res, next);
    next();
  });

  // routes that does not require authentication
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerRoutes.swaggerJson, {
    customCss: '.models { display: none !important }',
  }));

  app.use('/', authRoutes);
  app.use('/user', userRoutes);
  app.use('/media', mediaRoutes);
  app.use('/category', categoryRoutes);
  // validate user authentication
  // app.use(isAuthenticated);

  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send({ error: `Not Found. Accessing route - ${req.path} For ${req.method}` });
  });
};
