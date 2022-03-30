const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
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

// Serve static assets

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log("Backend server is running")
});
