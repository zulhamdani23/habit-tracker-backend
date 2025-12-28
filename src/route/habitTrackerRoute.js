const express = require("express");
const controller = require("../controller/habitTrackerController.js");
const router = express.Router();

router.get('/list', controller.list)
router.post('/progress', controller.isDone)
router.post('/summary', controller.summary)

module.exports =  router;