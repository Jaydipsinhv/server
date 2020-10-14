const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASS,
});

/**
 * get the value bind with specific key
 * @param {String} key
 * @returns {string} contains value bind with specific key
 */
const getValue = (key) => redisClient.getAsync(key);

/**
 * set the given value with key
 * @param {String} key
 * @param {String} value
 * @param {integer} expireTime to set expire time to the key, key will get deleted
 *                   after expire time automatically
 */
const setValue = (key, value, expireTime) => {
  if (expireTime > 0) {
    return redisClient.setAsync(key, value, 'EX', (parseInt(expireTime)));
  }
  return redisClient.setAsync(key, value);
};

/**
 *
 * @param {String} delete the key value pair from Redis store
 * @param {Boolean} withRegex use regular expression for delete multiple keys
 */
const deleteKey = async (key, withRegex) => {
  if (withRegex) {
    redisClient.keys(`${key}:*`, async (err, data) => {
      if (data && data.length) {
        await redisClient.del(data);
      }
    });
    return true;
  }
  return redisClient.del(key);
};

module.exports = {
  getValue,
  setValue,
  deleteKey,
};
