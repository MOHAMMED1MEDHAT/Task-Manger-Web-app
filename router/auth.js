const uservalidator=require("../middleware/userMWvalidator")
const bcrypt=require("bcrypt")
const User=require("../model/userModel")
const router = require('express').Router();

router.post('/',uservalidator,async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email}).exec();
        // console.log(user);
        if(!user) return res.status(400).send({status:"failuire email"});

        const valid=await bcrypt.compare(req.body.password,user.password);
        // console.log(valid);
        if(!valid) return res.status(400).send({status:"failuire password"});

        // if(!config.get("jwtsec"))return res.status(500).send("Request can't be fulfiled.. token not defined");

        const token=user.getAuthToken(user._id);
        res.header('x-auth-token',token);
        res.cookie('x-auth-token',token,{httpOnly:true});
        res.send({status:"Ok"});
    }catch(err){
        console.log(err)
        res.status(500).send("Internal server error");
    }
})

module.exports=router