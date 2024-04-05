const pool = require('../configs/DbConfig');

const createAttendance = (params, callback) => {

}

const getUserAttendance = (callback) => {
    pool.query(`
        SELECT * FROM attendance`, (error, results) => {
        if (error) {
            return callback(error);
        }

        return callback(null, results.rows);
    })
}

module.exports = {
    createAttendance,
    getUserAttendance
}