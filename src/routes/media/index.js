
const express = require('express');

const router = express.Router();
// const fs = require('fs');
// const mkdirp = require('mkdirp');
// const formidable = require('express-formidable');
// delete router.use(express.bodyParser());


const media = require('../../controller/media');
const validator = require('../../lib/validator/validator');
const schemas = require('../../controller/media/schema');
const isAuthenticated = require('../../lib/auth/isAuthenticated');

// router.use(isNormalUserAuthenticated);

router.delete('/:id', validator(schemas.deleteSchema), isAuthenticated, media.delete);

// router.use(formidable({
//   keepExtensions: true, uploadDir: process.env.MEDIA_UPLOAD_DIR, multiples: true,
// }));

router.post('/', validator(schemas.schema), media.create);

module.exports = router;

// function generateRootMediaDir() {
//   const rootMediaDir = process.env.MEDIA_UPLOAD_DIR || 'images';
//   if (!fs.existsSync(rootMediaDir)) {
//     mkdirp(rootMediaDir);
//   }
// }
// generateRootMediaDir();
