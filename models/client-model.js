const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema;

const clientSchema = schema({
  userId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: [true, 'First name is required!'],
    maxLength: [11, 'Phone number cannot exceed 11 Characters'],
    minLength: [3, 'Phone number should be greater then 3 characters'],
  },
  lastname: {
    type: String,
    required: [true, 'Last Name is required!'],
    maxLength: [11, 'Phone number cannot exceed 11 Characters'],
    minLength: [3, 'Phone number should be greater then 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter a valid email'],
    validate: [validator.isEmail, 'Please Enter a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  phone: {
    type: String,
    // required: [true, 'given Type is String'],
    maxLength: [20, 'Phone number cannot exceed 20 Characters'],
    minLength: [8, 'Phone number should be greater then 8 characters'],
  },
  state: {
    type: String,
  },
  address: {
    type: String,
  },
  zip_code: {
    type: Number,
  },
  city: {
    type: Boolean,
  },
  country: {
    type: Boolean,
  },
  admin_contact: {
    type: String,
  },
  summary_demand: {
    type: String,
  },
  title_demand: {
    type: String,
  },
  send_files: {
    type: String,

  },
  vaccine: {
    type: Boolean,
  },
  language: {
    type: Boolean
  },
  pa: {
    type: String,
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
clientSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

// return data without password
clientSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

clientSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('clients', clientSchema);
