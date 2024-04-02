const express = require('express')
const router = express.Router();
const attendanceController = require("../controllers/AttendanceController");

router.get('/attendance', attendanceController.getUserAttendance)
router.post('/attendance', attendanceController.createAttendance)

module.exports = router;