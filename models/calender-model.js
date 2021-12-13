const mongoose=require('mongoose');
const schema=mongoose.Schema;

const calenderSchema=schema({
  date: {
    type: Date,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },


});
module.exports=mongoose.model('Calender', calenderSchema);
