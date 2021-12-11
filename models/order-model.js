const mongoose = require('mongoose');
const validator=require('validator');
const OrderSchema=mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Enter your Email'],
    validate: [validator.isEmail, 'please enter valid email'],
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
  status_lead: {
    type: String,
    default: '',
  },
  sent_profile: {

  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

});
module.exports=mongoose.model('Order', OrderSchema);
