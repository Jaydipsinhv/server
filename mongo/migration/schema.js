const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const categorySchema = {
  name: { type: String, unique: true },
  slug: { type: String, unique: true },
  description: { type: String },
  images: [{
    name: { type: String },
    url: { type: String },
    default: { type: Boolean, default: false },
  }],
  sequence: { type: Number },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  parentId: { type: ObjectId, ref: 'Category' },
  createdBy: { type: ObjectId, ref: 'User', default: new mongoose.Types.ObjectId(process.env.ADMIN_USER_ID) },
  updatedBy: { type: ObjectId, ref: 'User', default: new mongoose.Types.ObjectId(process.env.ADMIN_USER_ID) },
};

module.exports = {
  categorySchema,
};
