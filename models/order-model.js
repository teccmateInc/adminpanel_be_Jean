const mongoose = require('mongoose');
const schema=mongoose.Schema;
const orderSchema=schema({
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
