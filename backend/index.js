const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/pins", pinRoute);
app.use("/users", userRoute);

app.listen(8800, () => {
    console.log("Backend server is running")
});
