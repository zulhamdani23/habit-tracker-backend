import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  streak: { type: Number, default: 0 },
  lastUpdated: Date
}, { timestamps: true });

export default mongoose.model("Habit", habitSchema);
