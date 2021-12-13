const mongoose = require('mongoose');
const validator=require('validator');
const schema=mongoose.Schema;
const orderSchema=schema({
  email: {
    type: String,
    required: [true, 'Enter your Email'],
    validate: [validator.isEmail, 'please enter valid email'],
    unique: true,
  },
  vaccine: {
    type: Boolean,
    required: [true, 'Enter vaccination status'],
  },
  notes: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    required: [true, 'Enter Position'],
  },
  statusLead: {
    type: String,
    default: '',
  },
  sentProfile: {
    type: String,
    default: '',

  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});
module.exports=mongoose.model('Order', orderSchema);
