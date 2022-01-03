const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema;
const superAdminSchema = schema({
  userId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: [true, 'First name is required!'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  lastname: {
    type: String,
    required: [true, 'Last Name is required!'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'enter email address'],
    validate: [validator.isEmail, 'Please Enter a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minlength: 8,
    select: false,
    // validate: [validator.isStrongPassword, 'Please Enter a valid Password'],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});
superAdminSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

// return data without password
superAdminSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

superAdminSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('superAdmins', superAdminSchema);
