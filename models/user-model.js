const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, jwtExpires} = require('../config/jwt.config');
const Candidate = require('./candidate-model');
const {handleError} = require('../helper/utils');

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
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  role: {
    type: String,
    default: 'client',
  },
  language: {
    type: String,
    // required: [true, 'Enter your language'],
  },

  vaccine: {
    type: Boolean,
  },
  city: {
    type: String,
    // required: [true, 'City Name is reequired'],
  },
  nationality: {
    type: String,
    // required: [true, 'Enter your Nationality'],
  },
  phone: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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

// userSchema.methods.postUser = function (res, data) {
//   const candidate = Candidate.create(data)
//   candidate.save((err) => {
//     if (err) handleError(res, "Unable to create candidate")
//     else {
//       res.status(201).json({
//         success: true,
//         data,
//         message: 'Created'
//       })
//     }
//   })
// };

// Compare Password

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
module.exports.get = function(callback, limit) {
  User.find(callback).limit(limit);
};
