/* eslint-disable no-unused-vars */
const mongoose = require('./mongoose');

mongoose.connect();

const migrateUser = require('./addCategories');
