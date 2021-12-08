const mongoose=require('mongoose');
const validator=require('validator');

const AdministratorSchema=mongoose.Schema({
  
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
})
//   email: {
//     type: String,
//     required: [],
//     validate: [validator.isEmail, 'Please Enter a valid email'],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Please Enter Your Password'],
//     minLength: [8, 'Password should be greater than 8 characters'],
//     select: false,
//   },
// });
module.exports=mongoose.model('Admin', AdministratorSchema);
