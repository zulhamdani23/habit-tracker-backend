const express = require("express");
const controller = require("../controller/habitController.js");
const router = express.Router();

router.get('/list', controller.list)

module.exports =  router;