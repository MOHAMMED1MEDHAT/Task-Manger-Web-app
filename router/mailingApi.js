const validator=require("../middleware/mailMWvalidator")
const sendmail=require("../controller/mailController")
const router = require('express').Router();

router.post('/',validator,sendmail)

module.exports=router