const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const userScheme = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true, // `email` must be unique
  },
}, {timestamps: true}, // createdAt, updatedAt
);

// Export User model
const User = module.exports = mongoose.model('users', userScheme);
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
