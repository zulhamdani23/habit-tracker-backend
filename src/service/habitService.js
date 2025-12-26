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

module.exports = habitSvc;