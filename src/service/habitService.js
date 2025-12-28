const habitSvc = {}
const db = require("../config/db")
const rawQuery = require("../query/habitQry")
const dto = require("../dtoMapper/habitDto")
const { result } = require("lodash")

habitSvc.listHabit = async () => {
    try {
        let data = []
        let dataQry = await db.query(rawQuery.listHabit, {
            type: db.QueryTypes.SELECT
        })

        if (dataQry.length > 0 ) {
            data = dto.entityToDtoListHabit(dataQry)
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

habitSvc.addHabit = async (payload) => {
    const { id, habitName, isActive} = payload
    try {
        const idExist = await db.query(rawQuery.exist, {
            replacements : { id },
            type: db.QueryTypes.SELECT
        })
        if (idExist.length > 0) {
            await db.query(rawQuery.updateHabitName, {
                replacements : { id, habitName },
                type: db.QueryTypes.UPDATE
            })
        } else {
            await db.query(rawQuery.addHabit, {
                replacements : { habitName },
                type: db.QueryTypes.INSERT
            })
        }
        return true
    } catch (error) {
        throw new Error(error.message)
    }
} 

habitSvc.aktifasi = async (isActive, id) => {
    try {
        await db.query(rawQuery.aktifasi, {
            replacements : { isActive, id },
            type: db.QueryTypes.UPDATE
        })
        return true
    } catch (error) {
        throw new Error(error.message)
    }
} 

module.exports = habitSvc;