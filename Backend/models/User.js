const mongoose = require("mongoose");

exports.userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    bio: {
        type: String
    },
    profilePicture: {
        type: String
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet"
        }
    ]
})