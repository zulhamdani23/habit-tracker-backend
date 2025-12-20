import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(cors());
app.use(express.json());

//Table of List Habit
// get all habits
const adapter = new JSONFile("db.json");
const db = new Low(adapter, { habits: [] });
await db.read();

app.get("/habits", (req, res) => {
  const data = db.data.habits
  res.json({
    data
  });
});

// create habit
app.post("/add-habit", async (req, res) => {
  const data = req.body
  const payload = {
    habit: data.habit
  };

  db.data.habits.push(payload.habit);
  await db.write();
  res.json({data: payload});
});


app.put("/update", async (req, res) => {
  const { habitName, year, month, day, isDone } = req.body;

  const fileName = `${year}_${month}_Done.json`;
  const adapter = new JSONFile(fileName);
  const db = new Low(adapter, {});

  await db.read();
  db.data ||= {};

  // pastikan tiap hari berupa array
  db.data[day] ||= [];

  if (isDone) {
    // ✔ CHECK
    if (!db.data[day].includes(habitName)) {
      db.data[day].push(habitName);
    }
  } else {
    // ❌ UNCHECK
    db.data[day] = db.data[day].filter(h => h !== habitName);

    // kalau hari kosong → hapus key
    if (db.data[day].length === 0) {
      delete db.data[day];
    }
  }

  await db.write();

  res.json({ success: true });
});

app.post("/habit/progress", async (req, res) => {
  try {
    const { year, month } = req.body;
    const yr = parseInt(year.replace(/"/g, ""), 10);
    const mt = parseInt(month.replace(/"/g, ""), 10);
    const fileName = `${yr}_${mt}_Done.json`
    const adapter = new JSONFile(fileName);
    const db = new Low(adapter, {});
    await db.read();
    db.data ||= {};  // kalau file masih kosong
    res.json(db.data);
  } catch (error) {
    console.log(error)
  }
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
