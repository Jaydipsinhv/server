/* eslint-disable no-use-before-define */
/* eslint-disable import/no-dynamic-require */
const _ = require('lodash');

const validate = async (req) => new Promise(async (resolve, reject) => {
  try {
    const { body } = req;
    const data = await getData(require(`../${body.moduleType}/${body.moduleType}.model`), body.moduleId);
    resolve(data);
  } catch (err) {
    reject(err);
  }
});

const getData = async (model, id) => new Promise(async (resolve, reject) => {
  try {
    const data = await model.findOne({ _id: id });
    if (!data || _.isEmpty(data)) {
      return reject(new Error('Record does not exists.'));
    }
    resolve(data);
  } catch (e) {
    reject(e);
  }
});

module.exports = {
  validate,
};
