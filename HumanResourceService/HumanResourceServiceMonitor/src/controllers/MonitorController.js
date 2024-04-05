const monitorService = require('../services/MonitorService.js');
const { validationResult } = require('express-validator');

async function createAttendance(req, res, next) {
    try {
        const errorValidation = validationResult(req);
        if (errorValidation.errors.length > 0) {
            let errMessage = "";
            errorValidation.errors.map(q => errMessage += `${q.msg}, `)

            return next({
                statusCode: 400,
                message: errMessage,
            });
        }

        const data = await monitorService.createAttendance(req, next)
        res.status(200).send(data)
    } catch (err) {
        next(err);
    }
}

async function getUserAttendance(req, res, next) {
    try {
        const data = await monitorService.getUserAttendance()
        res.status(200).send(data)
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAttendance,
    getUserAttendance
};