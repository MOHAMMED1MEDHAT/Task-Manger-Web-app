require("dotenv").config({ path: __dirname + "/.env" });
const userRouter = require("./router/user");
const authRouter = require("./router/auth");
const mailRouter = require("./router/mailingApi");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

mongoose
    .connect(process.env.ATLAS_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Task-Manger",
    })
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => console.log("error occured" + err));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/reg", userRouter);
app.use("/login", authRouter);
app.use("/api/sendMail", mailRouter);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
});

app.get("/main", (req, res) => {
    res.sendFile("public/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});
