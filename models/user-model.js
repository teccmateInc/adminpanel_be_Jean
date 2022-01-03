const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpires} = require('../config/jwt.config');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please Enter Your First Name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  lastname: {
    type: String,
    required: [true, 'Please Enter Your Last Name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    // minlength: [8, 'Password should be greater than 8 characters'],
    minlength: 8,
    select: false,
    // validate: [validator.isStrongPassword, 'Please Enter a valid Password'],
  },
  role: {
    type: String,
    default: 'client',
  },
}, {timestamps: true});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function() {
  return jwt.sign({id: this._id}, jwtSecret, {
    expiresIn: jwtExpires,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// return data without password
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    let type = ret.role
    delete ret.password;
    delete ret.role;
    return {...ret, type};
  },
});

module.exports = mongoose.model('User', userSchema);
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
