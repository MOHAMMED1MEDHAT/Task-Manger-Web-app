
let mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'demo22793@gmail.com',
        pass:'mfbtfisapxrakplz'
    }
});

const send_mail_data=(data)=>{
    let message="Hi mohammed these tasks are not finished:\n--------------\n";
    message+=data;
    return message
}

const send_mail=(data,userEmail)=>{
    let details ={
        from:"demo22793@gmail.com",
        to:userEmail,
        subject:"your Tasks:",
        text:send_mail_data(data)
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

module.exports = {
    send_mail
};
