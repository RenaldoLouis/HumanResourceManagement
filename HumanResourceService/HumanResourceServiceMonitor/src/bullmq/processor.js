const fs = require('fs');
const { promisify } = require('util');

const sleep = promisify(setTimeout);
const UserService = require('../services/UserService.js');


const jobProcessor = async (job) => {
    await job.log(`Started processing job with id on attendance_monitor service ${job.id}`);
    // TODO: do your CPU intense logic here
    let body = {
        body: job.data.body
    };
    await UserService.registerQueueProcess(body);

    await job.updateProgress(100);
    return 'DONE';
};

module.exports = jobProcessor;