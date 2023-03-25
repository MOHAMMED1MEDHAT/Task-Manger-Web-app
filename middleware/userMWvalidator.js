const validator=require("../util/userValidator");
module.exports=(req,res,nxt)=>{
    let valid=validator(req.body);
    if(valid){
        // console.log(req.body);
        nxt();
    }else{
        // console.log(req.body);
        // console.log("trying to send fuuuuuucccckkk")
        res.status(403).send("forbbiden commmand");
    }
}