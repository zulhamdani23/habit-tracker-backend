const habitQry = {}

habitQry.listHabit = `SELECT 
 id, habit_name 
FROM habit_tracker.habit 
WHERE 
 is_active = TRUE 
ORDER BY id ASC;`

module.exports = habitQry;