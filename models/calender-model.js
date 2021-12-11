const mongoose=require('mongoose')
const CalenderSchema=new mongoose.Schema({
        date:{
            type:Date,
            required:true
        },
        from:{
            type:String,
            required:true
        },
        to:{
            type:String,
            required:true
        },

    
})
module.exports=mongoose.model("Calender",CalenderSchema);