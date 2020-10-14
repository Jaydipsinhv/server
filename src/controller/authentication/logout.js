const { deleteKey } = require('../../lib/redis');

async function logout(req) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return req.sendResponse(422, 'Please provide token.');
    }

    token = token.split(' ')[1];
    // delete key from Redis based on token id
    await deleteKey(`auth:${token}`);

    return req.sendResponse(200, 'User logout successfully.');
  } catch (err) {
    return req.sendResponse(500, err);
  }
}

module.exports = logout;
