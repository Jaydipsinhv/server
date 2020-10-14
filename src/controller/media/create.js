const uploadToS3 = require('./uploadToS3');
const validateModule = require('./validateModule');
const updateModule = require('./updateModule');

const create = async (req) => {
  try {
    const moduleData = await validateModule.validate(req);
    const mediaObj = await uploadToS3.upload(req, moduleData);

    for (let index = 0; index < mediaObj.length; index++) {
      const element = mediaObj[index];
      if (req.body.options) {
        for (let i = 0; i < moduleData.options.length; i++) {
          const e = moduleData.options[i];
          if (element.id === e._id.toString()) {
            moduleData.options[i].value = element.url;
          }
        }
      } else {
        for (let i = 0; i < moduleData.images.length; i++) {
          const e = moduleData.images[i];
          if (element.id === e._id.toString()) {
            moduleData.images[i].url = element.url;
          }
        }
      }
    }

    await updateModule.update(req, moduleData);

    return req.sendResponse(200, moduleData.images);
  } catch (err) {
    return req.sendResponse(500, err);
  }
};

module.exports = create;
