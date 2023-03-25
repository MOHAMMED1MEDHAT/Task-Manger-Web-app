const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    owner:{
        type:String,
        required:true
    },
    tasks:{
        type:String,
        required:true
    }
});


module.exports=mongoose.model("tasks",taskSchema);
