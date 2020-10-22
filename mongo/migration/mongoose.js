/* eslint-disable max-len */
/**
 * Wrapper for mongoose
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const {
  categorySchema,
} = require('./schema');

const db = mongoose.connection;

const models = {};
db.once('open', () => {
  console.log('Connection Successful!');
  // prepare model for database operation
  const CategoryModelSchema = new Schema(categorySchema, { timestamps: true });
  models.CategoryModel = mongoose.model('category', CategoryModelSchema);
  // models.CategoryModel = mongoose.model('category', new Schema(CategoryModelSchema, { timestamps: true }));
});

module.exports = {
  connect: async () => {
    // const url = process.env.MONGO_URL || 'mongodb://localhost:27017/tutti';
    const url = 'mongodb+srv://dbadmin:Db09psDtrXxikSHi@cluster0.xix5k.mongodb.net/education?retryWrites=true&w=majority';
    return mongoose.connect(url, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
      useFindAndModify: false,
    });
  },
  disconnect: async () => mongoose.disconnect(),
  mongoose,
  models,
};
