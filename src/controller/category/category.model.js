const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CategoryModelSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: { type: String },
  images: [{
    name: { type: String },
    url: { type: String },
    default: { type: Boolean, default: false },
  }],
  sequence: { type: Number },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: ObjectId, ref: 'User', default: new mongoose.Types.ObjectId(process.env.ADMIN_USER_ID) },
  updatedBy: { type: ObjectId, ref: 'User', default: new mongoose.Types.ObjectId(process.env.ADMIN_USER_ID) },
}, { timestamps: true });

CategoryModelSchema.index({ name: 'text' });

/**
 *  @param {Object} filter condition to find document for update
 *  @param {Object} update updated values of the document
 */
CategoryModelSchema.statics.findAndUpdate = function (filter, update) {
  return this.findOneAndUpdate(filter, update, { new: true });
};

const CategoryModel = mongoose.model('category', CategoryModelSchema);

module.exports = CategoryModel;
