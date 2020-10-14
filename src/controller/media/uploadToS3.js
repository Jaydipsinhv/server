const fileExtension = require('file-extension');
const AWS = require('aws-sdk');
const fs = require('fs');
const sharp = require('sharp');

const config = {
  accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
};

const s3 = new AWS.S3(config);

/**
 * get the path of image and convert the size based on h and w inputs
 * @param {*} path file path to change the size
 * * @param {*} w width of the image
 * @param {*} h height of the image
 */
const getResizedBuffer = (path, w, h) => new Promise((resolve, reject) => {
  sharp(path)
    .resize(w, h)
    .toBuffer()
    .then((data) => { resolve(data); })
    .catch((err) => { reject(err); });
});

const uploadToS3 = async (newFileName, file) => new Promise(async (resolve, reject) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: newFileName,
      Body: file,
      ACL: 'public-read',
    };
    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.Location);
    });
  } catch (e) {
    reject(e);
  }
});

const mediaUploadMoving = async (files, imageIds) => new Promise(async (resolve, reject) => {
  try {
    const images = [];
    for (let index = 0; index < files.length; index++) {
      const item = files[index];
      const id = imageIds[index];
      const file = fs.readFileSync(item.path);
      const fileExt = fileExtension(item.name);
      const newFileName = `${id}.${fileExt}`;

      const s3Obj = await uploadToS3(newFileName, file);

      // convert the actual images to different size based on requirement
      const resizeImage1800 = await getResizedBuffer(file, 1800);
      await uploadToS3(`1800/${newFileName}`, resizeImage1800);

      const resizeImage100 = await getResizedBuffer(file, 100);
      await uploadToS3(`100/${newFileName}`, resizeImage100);

      await fs.unlinkSync(item.path);

      images.push({
        id,
        url: s3Obj,
      });
    }
    resolve(images);
  } catch (e) {
    reject(e);
  }
});

const upload = async (req) => new Promise(async (resolve, reject) => {
  try {
    if (!req.files) {
      return reject(new Error('Please select file'));
    }

    let { files } = req.files;
    files = Array.isArray(files) ? files : [files];

    let { imageIds } = req.body;
    imageIds = imageIds.split(',');

    const mediaUpload = await mediaUploadMoving(files, imageIds);
    resolve(mediaUpload);
  } catch (err) {
    reject(err);
  }
});

const remove = async (removeObj) => new Promise(async (resolve, reject) => {
  try {
    if (removeObj && removeObj.name) {
      const key = `${removeObj._id}.${fileExtension(removeObj.name)}`;
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    } else {
      reject(new Error('File not found'));
    }
  } catch (e) {
    reject(e);
  }
});


module.exports = {
  upload,
  remove,
};
