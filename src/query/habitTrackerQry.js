const habitTrackerQry = {}

habitTrackerQry.listHabit = `SELECT 
 id, habit_name, is_active 
FROM habit_tracker.habit 
WHERE 
 is_active = TRUE 
ORDER BY id ASC;`

habitTrackerQry.cekDone = `SELECT 
  id, is_done 
FROM habit_tracker.habit_progress hp 
WHERE 
  "day" = :day
AND 
  "month" = :month
AND 
  "year" = :year
AND 
  id_habit = :idHabit`

habitTrackerQry.isDone = `INSERT INTO habit_tracker.habit_progress (
  id_habit,
  is_done,
  day,
  month,
  year
) VALUES (
  :idHabit,
  true,
  :day,
  :month,
  :year
);`

habitTrackerQry.upDone = `UPDATE habit_tracker.habit_progress hp 
SET is_done = :isDone
WHERE 
  "day" = :day
AND 
  "month" = :month
AND 
  "year" = :year
AND 
  id_habit = :idHabit;`

habitTrackerQry.summary = `SELECT 
  hp."day", h.id 
FROM habit_tracker.habit_progress hp
JOIN habit_tracker.habit h ON h.id = hp.id_habit
WHERE 
  hp."month" = :month
AND 
  hp."year" = :year
AND 
  hp.is_done = TRUE 
AND
  h.is_active = TRUE
ORDER BY hp."day" ASC;`

module.exports = habitTrackerQry;