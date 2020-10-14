const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = (app) => {
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
    format: winston.format.combine(winston.format.colorize()),
    meta: false,
    expressFormat: true,
    colorize: true,
  }));
};
