
/**
* @name ./lib/validator/validator.js
* @author Jaydipsinh Vaghela <jaydip.vaghela@gmail.com>
*
* @version 0.0.1
*/

// External module dependencies
const Joi = require('joi');
const _ = require('lodash');

/**
* A per route validation option
*
* @param {Object|Array} validations The validations to perform on the specified route
* @param {Object} options A list of options for validations.
* @return {Function}
*
* @public
*/
module.exports = function joiValidate(validations, options) {
  options = options || { abortEarly: false };

  /**
  * The middleware that handles the route validation
  *
  * @param {Object} req The express request object
  * @param {Object} res The express result object
  * @param {Function} next The function to call upon validation completion
  *
  * @private
  */
  function validate(req, res, next) {
    // Get method from req
    const { method } = req;
    // Get all of our req data items
    req.body = _.isEmpty(req.body) ? (req.fields ? req.fields : req.body) : req.body;
    const { body } = req;
    const items = {};


    // Only store body methods on calls that may have a body
    if (method !== 'GET' && method !== 'DELETE') {
      // eslint-disable-next-line no-use-before-define
      copyObject(body, items, validations, options.strict, true);
    }

    const { error } = Joi.validate(body, validations);
    if (error) {
      if (error.details && error.details.length) {
        res.status(422).send({ error: error.details[0].message });
      } else {
        res.status(422).send({ error: error.message });
      }
    } else {
      next();
    }
  }

  return validate;
};

// Expose the Joi object so users can create validation schemas.
// exports.Joi = Joi;

/**
* Copies one object's first level parameters to a second ones
*
* @param {Object} from An object to copy from.
* @param {Object} to An object to copy to.
* @param {Object} validations list of validation keys.
* @param {Boolean} strict whether to reject keys that aren't in validations list
* @param {Boolean} decode whether to use decodeURIComponent or not
*
* @private
*/
function copyObject(from, to, validations, strict, decode) {
  const extras = {};
  if (from) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in from) {
      // Removed validations.hasOwnProperty stuff, because if its joi.object.keys
      // it breaks apart.
      // eslint-disable-next-line no-prototype-builtins
      if (from.hasOwnProperty(key)) {
        try {
          to[key] = (decode && typeof (from[key]) === 'string') ? decodeURIComponent(from[key]) : from[key];
        } catch (err) {
          to[key] = from[key];
        }
      } else {
        try {
          extras[key] = (decode && typeof (from[key]) === 'string') ? decodeURIComponent(from[key]) : from[key];
        } catch (err) {
          extras[key] = from[key];
        }
      }
    }
  }

  return extras;
}
