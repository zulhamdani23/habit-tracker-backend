const habitTrackerSvc = {}
const db = require("../config/db")
const rawQuery = require("../query/habitTrackerQry")
const dto = require("../dtoMapper/habitTrackerDto")
const { result } = require("lodash")

habitTrackerSvc.cekDone = async (payload) => {
    const { idHabit, isDone, day, month, year } = payload;
    try {
        let data = {}
        let dataQry = await db.query(rawQuery.cekDone, {
            replacements : {idHabit, day, month, year},
            type: db.QueryTypes.SELECT
        })
        console.log(dataQry)
        if (dataQry.length > 0 ) {
            data = dto.entityToDtoCekDone(dataQry[0])
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

habitTrackerSvc.isDone = async (payload) => {
    let data = false
    const { idHabit, day, month, year } = payload;
    try {
        await db.query(rawQuery.isDone, {
            replacements : {idHabit, day, month, year},
            type: db.QueryTypes.INSERT
        })
        data = true
        return data
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

habitTrackerSvc.upDone = async (payload, isDoneInit) => {
    let data = false
    let isDone = !isDoneInit
    const { idHabit, day, month, year } = payload;
    try {
        await db.query(rawQuery.upDone, {
            replacements : {idHabit, isDone, day, month, year},
            type: db.QueryTypes.UPDATE
        })
        data = true
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

habitTrackerSvc.summary = async (payload) => {
    const { month, year} = payload;
    try {
        const data = await db.query(rawQuery.summary, {
            replacements : { month, year },
            type: db.QueryTypes.SELECT
        })
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

habitTrackerSvc.summaryMapper = async (days, defVal, dataDb) => {
    try {
        let dataInit = {}
        let data = {}

        dataDb.forEach(e => {
            if(!dataInit[e.id]) dataInit[e.id] = []
            dataInit[e.id].push(e.day)
        });
        if(dataDb.length === 0) {
            for (let e of defVal) {
                data[e.id] = Array(days).fill(false);
            }
        } else {
            for (let key in dataInit) {
                const valuesDoneTrueOrFalse = dataInit[key]
                data[key] = []
                for (let i = 1; i<=days; i++) {
                    const exist = valuesDoneTrueOrFalse.includes(String(i))
                    data[key].push(exist)
                }
            }
        }

        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = habitTrackerSvc;