const express = require('express')
const router = express.Router();
const monitorController = require("../controllers/MonitorController");

router.get('/monitor', monitorController.getUserAttendance)
router.post('/monitor', monitorController.createAttendance)

module.exports = router;