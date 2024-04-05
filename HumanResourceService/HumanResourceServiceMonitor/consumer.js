// // consumer.js
// const { Worker, Queue } = require('bullmq');
// const monitorController = require("./src/controllers/MonitorController");

// // Create a new Queue instance connected to Redis
// const userQueue = new Queue('mailer', {
//     connection: {
//         host: 'localhost',
//         port: 6379,
//     },
// });

// // Define job processing logic
// const worker = new Worker('mailer', async (job) => {
//     const data = job.data;

//     // Perform the email sending operation
//     console.log(`Sending email to ${data.to} with subject: ${data.subject}`);
//     monitorController.getUserAttendance(data);
// });

// // Optionally, handle worker events
// worker.on('completed', (job) => {
//     console.log('Job completed:', job.id);
// });

// worker.on('failed', (job, err) => {
//     console.error('Job failed:', err);
// });

// // Start listening for jobs
// worker.on('waiting', () => {
//     console.log('Waiting for jobs...');
// });
