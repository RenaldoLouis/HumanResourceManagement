const fs = require('fs');
// const { parse } = require('csv-parse');
const { promisify } = require('util');

const sleep = promisify(setTimeout);


const jobProcessor = async (job) => {
    await job.log(`Started processing job with id on attendance service ${job.id}`);
    // TODO: do your CPU intense logic here
    // await extractCSVData(job?.data);

    await job.updateProgress(100);
    return 'DONE';
};

module.exports = jobProcessor;

// rephrase using appropriate software programming terms: "