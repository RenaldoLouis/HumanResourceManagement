
const db = require('../repositories/AttendanceRepository.js');
const databaseUtil = require('../utils/DatabaseUtil.js');

async function createAttendance(req) {
    const body = req.body;
    try {
        return await databaseUtil.executeDatabaseOperation(db.createAttendance, body);
    } catch (error) {
        throw error;
    }
}

async function getUserAttendance() {
    try {
        return await databaseUtil.executeDatabaseOperation(db.getUserAttendance);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAttendance,
    getUserAttendance
};