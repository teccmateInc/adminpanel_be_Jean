const mongoose = require('mongoose');

const schema = mongoose.Schema;

const fieldSchema = schema({
  type: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  arrayString: [[String]],
  arrayNumber: [Number],
}, {timestamps: true});

module.exports = mongoose.model('Field', fieldSchema);
