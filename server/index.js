require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const { connect } = require("./config/database");
const userRoute = require("./routes/auth");

connect();

app.use(express.json());
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
    })
);

app.use("/api/v1/auth", userRoute)
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
})

app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})