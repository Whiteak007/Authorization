import express from "express";
const router = express.Router();
import rateLimit from 'express-rate-limit';
// Import authentication controllers and validation middleware
import { signupValidation, loginValidation } from "../Middlewares/AuthValidation.js";
import { login, signup } from "../Controllers/AuthController.js";

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many login attempts, please try again later'
  });

  
// POST route for user login, with validation middleware
router.post("/login", loginValidation, login);

// POST route for user signup, with validation middleware
router.post("/signup", signupValidation, signup);

// Export the router to be used in the main application
export default router;
