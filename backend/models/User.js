const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);