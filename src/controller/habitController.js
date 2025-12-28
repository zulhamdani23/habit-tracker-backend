const resMsg = require("../util/resMessage.js")
const stCode = require("../util/statusCode.js")
const service = require("../service/habitService.js")
const funcHelp = require("../util/helperFunction.js")
const _ = require("lodash")

const habitController = {}

habitController.list = async (req, res) => {
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

habitController.addHabit = async (req, res) => {
    try {
        let payload = req.body
        await service.addHabit(payload)
        res.status(stCode.OK).json(
            resMsg.success({})
        )
    } catch (error) {
        res.status(stCode.INTERNAL_ERROR).json(
            resMsg.failed(error.message)
        )
    }
}

habitController.aktifasi = async (req, res) => {
    try {
        let isActive = req.body.isActive
        let id = req.body.id
        await service.aktifasi(isActive, id)
        res.status(stCode.OK).json(
            resMsg.success({})
        )
    } catch (error) {
        res.status(stCode.INTERNAL_ERROR).json(
            resMsg.failed(error.message)
        )
    }
}


module.exports = habitController;