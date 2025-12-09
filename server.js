import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(cors());
app.use(express.json());

// init DB
const adapter = new JSONFile("db.json");
const db = new Low(adapter, { habits: [] });
await db.read();

// get all habits
app.get("/habits", (req, res) => {
  const data = db.data.habits
  res.json({
    data
  });
});

// create habit
app.post("/habits", async (req, res) => {
  const habit = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || "",
    streak: 0,
    lastUpdated: null
  };

  db.data.habits.push(habit);
  await db.write();
  res.json(habit);
});

// update streak
app.put("/habits/:id", async (req, res) => {
  const habit = db.data.habits.find(h => h.id == req.params.id);
  if (!habit) return res.status(404).json({ msg: "Habit not found" });

  const today = new Date().toDateString();
  const last = habit.lastUpdated ? new Date(habit.lastUpdated).toDateString() : null;

  if (today !== last) {
    habit.streak += 1;
  }

  habit.lastUpdated = new Date();
  await db.write();

  res.json(habit);
});

// delete habit
app.delete("/habits/:id", async (req, res) => {
  db.data.habits = db.data.habits.filter(h => h.id != req.params.id);
  await db.write();
  res.json({ msg: "Deleted" });
});

// reset streak
app.put("/habits/:id/reset", async (req, res) => {
  const habit = db.data.habits.find(h => h.id == req.params.id);
  if (!habit) return res.status(404).json({ msg: "Habit not found" });

  habit.streak = 0;
  habit.lastUpdated = null;
  await db.write();
  res.json(habit);
});

// get daily checklist
app.get("/history/:date", (req, res) => {
  const h = db.data.history.find(h => h.date == req.params.date);
  if (!h) return res.json({ date: req.params.date, done: [] });
  res.json(h);
});

// save/update daily checklist
app.post("/history", async (req, res) => {
  const { date, done } = req.body;
  let record = db.data.history.find(h => h.date == date);

  if (record) {
    record.done = done;  // update
  } else {
    record = { date, done };
    db.data.history.push(record);
  }

  await db.write();
  res.json(record);
});


const PORT = 5000;
app.listen(PORT, () => console.log("🚀 Backend running at http://localhost:" + PORT));
