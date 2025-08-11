// Import core server libraries
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from 'helmet';
// Import custom modules
import connectDB from "./Config/db_connect.js";
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from './Routes/ProductRouter.js'

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;


// Connect to the database and then start the server
const startServer = async () => {
    try {
        await connectDB();
        
        // Middleware
        app.use(bodyParser.json());
        app.use(cors());

        app.use(helmet());

        // API Routes
        app.use("/api/auth", AuthRouter);
        app.use("/api/products", ProductRouter);

        // Root route
        app.get("/", (req, res) => {
            res.send("Hello! from Backend");
        });

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit with a failure code
    }
};

startServer();
