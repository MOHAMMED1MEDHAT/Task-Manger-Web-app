const nodemailer=require("nodemailer")
const User=require("../model/userModel")
const Task=require("../model/tasksModel")
const jwt=require("jsonwebtoken");

const mailSend=async(req,res)=>{
    try{
        //test
        // console.log(req.header("x-auth-token"));
        const tokenPayload=jwt.verify(req.header("x-auth-token"),"thisthesecrettokenkey");

        let ownerExists=await Task.findOne({owner:tokenPayload.userId})

        if(!ownerExists){
            let owner=new Task({
                owner:tokenPayload.userId,
                tasks:req.body.tasks
            });
            await owner.save();
        }else{
            const task=await Task.findOne({owner:tokenPayload.userId})
            await Task.findByIdAndUpdate(task._id,{
                tasks:req.body.tasks
            })
        }

        let user=await User.findById(tokenPayload.userId).exec();
        let task=await Task.findOne({owner:user._id});

        send_mail(task.tasks,user.email);

        res.status(200).send({status:"email sent"});
    }catch(err){
        res.status(500).send("internal server error"+err);
        console.log(err);
    }
}


let mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'demo22793@gmail.com',
        pass:'mfbtfisapxrakplz'
    }
});

function send_mail(data,userEmail){
    let details ={
        from:"demo22793@gmail.com",
        to:userEmail,
        subject:"your Tasks:",
        text:"Hi mohammed these tasks are not finished:\n--------------\n"+data
    }
    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("mail text \n"+details.text);
            console.log('mail sent');
        }
    });
}


module.exports=mailSend