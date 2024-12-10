require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;
const cors = require("cors");
const { connect } = require("./config/database");
const userRoute = require("./routes/auth");
const formRoute = require("./routes/form");

connect();

app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/forms", formRoute);
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
})

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})