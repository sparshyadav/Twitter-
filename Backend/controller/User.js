const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

exports.signupUser = async (req, res) => {
    try {
        // Take User Inputs
        const { username, email, password } = req.body;

        // Validate User Inputs
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        // Check if User is Already Registered
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists"
            })
        }

        // Hash the Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a New User
        const newUser = await User.create({
            username, password: hashedPassword, email
        })

        res.status(200).json({
            success: true,
            message: "User SignedUp Successfully",
            user: newUser
        })
    }
    catch (error) {
        console.log("An Error Occurred While Signing Up a New User -", error);

        res.status(500).json({
            success: false,
            message: "An Error Occurred While Signing Up a New User",
            error: error.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        // Take User Inputs
        const { email, password } = req.body;

        // Validate User Inputs
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required"
            })
        }

        // Find User
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Doesn't Exists"
            })
        }

        // Check Password Matching
        const checkPassword = bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(402).json({
                success: false,
                message: "Password does not Match"
            })
        }

        // Create Token
        const payload = {
            user: user.username,
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        // Send Cookie
        res.cookie("token", token, { httpOnly: true }).status(200).json({
            success: true,
            message: "User LogedIn Successfully",
            token: token,
            cookie,
            user: user
        })
    }
    catch (error) {
        console.log("An Error Occurred While LoggingIn the User - ", error);

        res.status(500).json({
            success: false,
            message: "An Error Occurred While LoggingIn the User",
            error: error.message
        })
    }
}