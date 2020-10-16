const mongoose = require('mongoose');
const { COURSE_TYPE_ARRAY } = require('../../lib/constant');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CourseModelSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  slug: { type: String },
  description: { type: String },
  tags: [{ type: ObjectId }],
  levels: [{ type: String }],
  images: [{
    name: { type: String },
    url: { type: String },
    default: { type: Boolean, default: false },
  }],
  teachers: {
    _id: { type: ObjectId },
    name: { type: String },
    slug: { type: String },
    profileImageId: { type: String },
    skills: [{ type: String }],
  },
  time: { type: Number },
  chaptersCount: { type: Number },
  courseType: { type: String, enum: COURSE_TYPE_ARRAY },
  studentsCount: { type: Number },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: ObjectId, ref: 'User', default: new mongoose.Types.ObjectId(process.env.ADMIN_USER_ID) },
  updatedBy: { type: ObjectId, ref: 'User', default: new mongoose.Types.ObjectId(process.env.ADMIN_USER_ID) },
}, { timestamps: true });

/**
 *  @param {Object} filter condition to find document for update
 *  @param {Object} update updated values of the document
 */
CourseModelSchema.statics.findAndUpdate = function (filter, update) {
  return this.findOneAndUpdate(filter, update, { new: true });
};

const CourseModel = mongoose.model('course', CourseModelSchema);

module.exports = CourseModel;
