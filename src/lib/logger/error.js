const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = (app) => {
  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.File({ filename: 'logs/error.log' }),
    ],
    format: winston.format.combine(
      winston.format.json(),
    ),
  }));
};
