const jwt=require("jsonwebtoken")
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.method("getAuthToken",(id,isAdmin)=>{
    const token=jwt.sign({
        userId:id,
    },"thisthesecrettokenkey");
    console.log(id);
    return token;
});

module.exports=mongoose.model("users",userSchema);