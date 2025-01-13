import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath

// Import routes
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";

// Load environment variables
dotenv.config();

const app = express();

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", authRoute);
app.use("/uploads", express.static(path.join(__dirname, "assets/uploads"))); // Use __dirname correctly

// Middleware to authenticate token using on productRoute
app.use(authenticateToken);
app.use("/products", productRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER IS RUNNING IN PORT ${process.env.APP_PORT}`);
  console.log(
    `Open http://localhost:${process.env.APP_PORT} to see the result`
  );
});
