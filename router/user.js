const uservalidator = require("../middleware/userMWvalidator");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");
const router = require("express").Router();

router.post("/", uservalidator, async (req, res) => {
    try {
        const used = await User.findOne({ email: req.body.email }).exec();
        if (used) {
            return res.status(403).send("this email already exists");
        }
        let salt = await bcrypt.genSalt(10);
        let hashedpwsd = await bcrypt.hash(req.body.password, salt);

        let user = new User({
            email: req.body.email,
            password: hashedpwsd,
        });

        await user.save();
        const token = user.getAuthToken(user._id);
        res.header("x-auth-token", token);
        res.cookie("x-auth-token", token);
        console.log(req.body.email, hashedpwsd);
        res.status(200).send({ status: "Ok" });
    } catch (err) {
        res.status(500).send("internal server error" + err);
        console.log(err);
    }
});

module.exports = router;
