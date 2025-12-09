import express from "express";
import Habit from "../models/Habit.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// create habit
router.post("/", auth, async (req, res) => {
  const habit = await Habit.create({ ...req.body, userId: req.userId });
  res.json(habit);
});

// get all habits
router.get("/", auth, async (req, res) => {
  const habits = await Habit.find({ userId: req.userId });
  res.json(habits);
});

// update streak progress
router.put("/:id", auth, async (req, res) => {
  const habit = await Habit.findById(req.params.id);
  const now = new Date().toDateString();
  const last = habit.lastUpdated?.toDateString();

  if (now !== last) habit.streak += 1; // naik streak
  habit.lastUpdated = new Date();
  await habit.save();

  res.json(habit);
});

// delete habit
router.delete("/:id", auth, async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;
