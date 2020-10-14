require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const requestIp = require('request-ip');
const helmet = require('helmet');

const mongoose = require('./lib/mongoose');
const { bugsnagMiddleware } = require('./integration');

const app = express();

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
  // bugsnag request handling middleware
  app.use(bugsnagMiddleware.requestHandler);
}

app.use(helmet());

// connect with mongoDB via mongoose ORM
mongoose.connect();

app.use(compression({
  level: 6, // default compression
}));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(cors());

// attach IP address in header field to catch IP of each request
app.use((req, res, next) => {
  req.headers.ip = requestIp.getClientIp(req);
  next();
});

// manage console logs: to print the logs and error on console
require('./lib/logger/console')(app);
require('./lib/auth/passport');
require('./routes')(app);

// log every errors into the logs/error.log file via winston error logger
require('./lib/logger/error')(app);

if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
  // bugsnag error handling middleware
  app.use(bugsnagMiddleware.errorHandler);
}


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
