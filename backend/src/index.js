import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./db/dbConnect.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors()); // Enable pre-flight requests for all routes

app.use("/chat/user", authRouter);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
