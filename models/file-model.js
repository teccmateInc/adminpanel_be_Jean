const mongoose = require('mongoose');

const schema = mongoose.Schema;
const fileSchema = schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  encoding: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  size: {
    type: Number,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
}, {timestamps: true});

module.exports = mongoose.model('File', fileSchema);
