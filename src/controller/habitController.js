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


module.exports = habitController;