const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')

const AdministratorSchema=mongoose.Schema({
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
    required: [],
    validate: [validator.isEmail, 'Please Enter a valid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
},
});

AdministratorSchema.pre('save', async function() {
  this.password=await bcrypt.hash(this.password, 10);
});
AdministratorSchema.methods.comparePassword=async function(password) {
  return await bcrypt.compare(password, this.password);
};
module.exports=mongoose.model('Admin', AdministratorSchema);
