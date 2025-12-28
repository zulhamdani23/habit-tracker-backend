const resMsg = require("../util/resMessage.js")
const stCode = require("../util/statusCode.js")
const service = require("../service/habitTrackerService.js")
const serviceHabit = require("../service/habitService.js")
const funcHelp = require("../util/helperFunction.js")
const _ = require("lodash")

const habitTrackerController = {}

habitTrackerController.list = async (req, res) => {
    try {
        let data = await service.listHabit()
        res.status(stCode.OK).json(
            resMsg.success(data)
        )
    } catch (error) {
        res.status(stCode.INTERNAL_ERROR).json(
            resMsg.failed(error.message)
        )
    }
}

habitTrackerController.isDone = async (req, res) => {
    try {
        let payload = req.body;
        let data = await service.cekDone(payload)
        if (_.isEmpty(data)) {
            await service.isDone(payload)
        } else {
            await service.upDone(payload, data.isDone)
        }

        res.status(stCode.OK).json(
            resMsg.success(true)
        )
    } catch (error) {
        res.status(stCode.INTERNAL_ERROR).json(
            resMsg.failed(error.message)
        )
    }
}

habitTrackerController.summary =  async (req, res) => {
  try {
    const payload = req.body;
    const days = payload.days
    const dataDb = await service.summary(payload)
    const defVal = await service.listHabit()
    const data = await service.summaryMapper(days, defVal, dataDb)
    res.status(stCode.OK).json(
        resMsg.success(data)
    )
  } catch (error) {
    res.status(stCode.INTERNAL_ERROR).json(
            resMsg.failed(error.message)
        )
  }
}

module.exports = habitTrackerController;