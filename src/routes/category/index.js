const express = require('express');

const router = express.Router();

const category = require('../../controller/category');

router.get('/', category.get);
router.get('/all', category.getAll);
router.get('/:categoryId', category.getById);

module.exports = router;
