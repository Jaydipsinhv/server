const express = require('express');

const router = express.Router();

const user = require('../../controller/user');
const isAuthenticated = require('../../lib/auth/isAuthenticated');

router.get('/me/', isAuthenticated, user.get);

module.exports = router;
