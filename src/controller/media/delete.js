const uploadToS3 = require('./uploadToS3');
const validateModule = require('./validateModule');
const updateModule = require('./updateModule');

const _delete = async (req) => {
  try {
    const mediaId = req.params.id;
    const moduleData = await validateModule.validate(req);
    const removeMedia = moduleData.images.filter((obj) => obj._id.toString() === mediaId);
    moduleData.images = moduleData.images.filter((obj) => obj._id.toString() !== mediaId);
    await updateModule.update(req, moduleData);
    await uploadToS3.remove(removeMedia[0]);
    return req.sendResponse(200, { id: mediaId, msg: 'Media deleted successfully.' });
  } catch (err) {
    return req.sendResponse(500, err);
  }
};

module.exports = _delete;
