const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLE_ARRAY, ROLE } = require('../../lib/constant');

const UserModelSchema = new mongoose.Schema({
  email: { type: String, lowerCase: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  resetPasswordToken: { type: String, select: false },
  profileImage: { type: Array },
  provider: { type: Array },
  interest: { type: Array },
  role: { type: String, default: ROLE.USER, enum: ROLE_ARRAY },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

UserModelSchema.pre('save', function () {
  this.updatedAt = new Date();
  const SALT_FACTOR = 10;
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  return Promise.resolve();
});

/**
 *  @param {Object} filter condition to find document for update
 *  @param {Object} update updated values of the document
 */
UserModelSchema.statics.findAndUpdate = function (filter, update) {
  return this.findOneAndUpdate(filter, update, { new: true });
};

UserModelSchema.statics.comparePassword = function (password, password2) {
  return bcrypt.compareSync(password, password2);
};

const UserModel = mongoose.model('User', UserModelSchema);

module.exports = UserModel;
