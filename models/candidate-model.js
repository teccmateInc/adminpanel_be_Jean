const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const schema = mongoose.Schema;
const candidateSchema = schema({
  userId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: [true, 'FirstName is required!'],
    maxLength: [20, 'First Name cannot exceed 20 Characters'],
    minLength: [3, 'First Name should be greater then 3 characters'],
  },
  lastname: {
    type: String,
    required: [true, 'LastName is required!'],
    maxLength: [20, 'Last Name cannot exceed 20 Characters'],
    minLength: [3, 'Last Name should be greater then 3 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    validate: [validator.isEmail, 'Please enter valid email'],
    unique: true,
  },
  birthdate: {
    type: Date,
    // // required: [true, 'Birthdate is Required!'],
  },
  status_marital: {
    type: Boolean,
    // // required: [true, 'Marital Status is required!'],
  },
  city: {
    type: String,
    // required: [true, 'City Name is reequired'],
  },
  nationality: {
    type: String,
    // required: [true, 'Enter your Nationality'],
  },
  language: {
    type: Boolean,
    // required: [true, 'Enter your language'],
  },
  status_candidate: {
    type: Boolean,
  },
  interview_done: {
    type: Boolean,
  },
  status_info: {
    type: Boolean,
  },
  mission_type: {
    type: Boolean,
  },
  sector: {
    type: Boolean,
  },
  email: {
    type: String,
    required: [true, 'Enter youor email'],
    validate: [validator.isEmail, 'please Enter valid email'],
  },
  skype: {
    type: String,
  },
  website: {
    type: String,
  },
  country: {
    type: String,
  },
  postal_code: {
    type: Number,
  },
  canton: {
    type: String,
  },
  phone: {
    type: String,
  },
  mobile: {
    type: String,
  },
  street: {
    type: String,
  },
  car_license: {
    type: Boolean,
  },
  personal_car: {
    type: Boolean,
  },
  boat_license: {
    type: Boolean,
  },
  work_permit: {
    type: Boolean,
  },
  experience: {
    type: Boolean,
  },
  main_function: {
    type: Boolean,
  },
  functions: {
    type: Boolean,
  },
  living2: {
    type: Boolean,
  },
  couple: {
    type: Boolean,
  },
  spouse_name: {
    type: String,
  },
  working_place: {
    type: Boolean,
  },
  activity_rate: {
    type: Number,
  },
  working_days: {
    type: Boolean,
  },
  animal: {
    type: Boolean,
  },
  smoker: {
    type: Boolean,
  },
  travel: {
    type: Boolean,
  },
  vaccine: {
    type: Boolean,
  },
  salary_chf: {
    type: Number,
  },
  salary_other: {
    type: Number,
  },
  salary_13: {
    type: Number,
  },
  salary_hour: {
    type: Number,
  },
  certificat: {
    type: String,
  },
  feedback_ref: {
    type: String,
  },
  feedback_interview: {
    type: String,
  },
  infos: {
    type: String,
  },
  remark: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
});
candidateSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
candidateSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('Candidate', candidateSchema);
