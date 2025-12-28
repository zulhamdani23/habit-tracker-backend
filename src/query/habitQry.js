const habitQry = {}

habitQry.listHabit = `SELECT 
 id, habit_name, is_active 
FROM habit_tracker.habit 
ORDER BY id ASC;`

habitQry.addHabit = `INSERT INTO habit_tracker.habit  (
  habit_name,
  is_active 
) VALUES (
  :habitName,
  true
);`

habitQry.exist = `SELECT id FROM habit_tracker.habit h 
WHERE id = :id`

habitQry.aktifasi = `UPDATE habit_tracker.habit 
SET is_active = :isActive
WHERE id = :id`

habitQry.updateHabitName = `UPDATE habit_tracker.habit 
SET habit_name = :habitName 
WHERE id = :id;`

module.exports = habitQry;