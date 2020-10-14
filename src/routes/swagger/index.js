
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    description: 'Education API',
    version: '1.0.0',
    title: 'Education API',
    swagger: '3.0.0',
  },
  basePath: '/',
  schemes: [
    'https',
    'http',
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/**/*.js', 'src/swagger-definitions/**/*.yml', 'src/swagger-definitions/*.yml'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerJson: swaggerSpec,
};
