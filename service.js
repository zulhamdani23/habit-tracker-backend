import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import habitRoutes from "./src/routes/habitRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Habit Tracker API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
