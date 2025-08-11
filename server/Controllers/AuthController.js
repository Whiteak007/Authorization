// Controllers/AuthController.js
import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // The Joi validation middleware already handles basic validation,
        // so we can directly proceed with checking for existing users.
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "An account with this email already exists.", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "User signed up successfully! You can now log in.", success: true });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "An unexpected error occurred. Please try again.", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password.",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password.",
                success: false
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful!",
            success: true,
            jwtToken,
            email,
            name: user.name
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "An unexpected error occurred. Please try again.",
            success: false
        });
    }
};