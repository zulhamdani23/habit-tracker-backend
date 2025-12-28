const express = require("express");
const controller = require("../controller/habitController.js");
const router = express.Router();

router.get('/list', controller.list)
router.post('/upsert', controller.addHabit)
router.put('/aktifasi/:id', controller.aktifasi)

module.exports =  router;