const emailProvider = require('./email');

/**
 * handling format to send error response into the response
 * if we send custom to true in error object then send custom generated object into the response
 * @param {*} err
 */
const errorHandler = (err) => {
  if (err.custom) {
    delete err.custom;
    return err;
  }
  return { error: err.message ? err.message : err };
};

/**
 *  handling format to send success response into the response
 * @param {*} data
 */
const successHandler = (data) => {
  if (!data) {
    data = null;
  }
  if (typeof data === 'string') {
    return {
      message: data,
    };
  }
  return data;
};

/**
 *
 * @param {Object} res response object of the request to send information to FE
 * @param {Integer} statusCode request status code based on success/fail
 * @param {Object} data information that need to send to request
 */
const sendResponse = async (req, res, next, statusCode, data) => {
  // if status code is success then response with success handler
  if (statusCode >= 200 && statusCode <= 299) {
    return res.status(statusCode).send(successHandler(data));
  }
  // request are failed with randomstatus code. need to handle flow based on status code
  // if status code is 500 plus then need to send email alert for handle error in backend code
  if (statusCode >= 500) {
    if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
      emailProvider.sendEmail(
        process.env.SEND_EMAIL_ALERT,
        `Error in Code (${process.env.NODE_ENV})`,
        'Error',
        {
          content: data.stack, apiEndpoint: req.headers.host + req.baseUrl, method: req.method,
        },
      );
    }
    next(data);
  }
  if (statusCode >= 400 && statusCode < 500) {
    next(data);
  }
  return res.status(statusCode).send(errorHandler(data));
};

module.exports = {
  sendResponse,
};
