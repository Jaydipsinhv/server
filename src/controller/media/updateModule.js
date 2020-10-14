/* eslint-disable import/no-dynamic-require */
const _ = require('lodash');

const updateModule = async (model, id, updateValue) => new Promise(async (resolve, reject) => {
  try {
    const data = await model.findOneAndUpdate({ _id: id }, updateValue);
    if (!data || _.isEmpty(data)) {
      return reject(new Error('Record does not exists.'));
    }
    resolve(data);
  } catch (e) {
    reject(e);
  }
});

const update = async (req, updateValue) => new Promise(async (resolve, reject) => {
  try {
    const { body } = req;
    const data = await updateModule(require(`../${body.moduleType}/${body.moduleType}.model`), body.moduleId, updateValue);
    resolve(data);
  } catch (err) {
    reject(err);
  }
});

module.exports = {
  update,
};
