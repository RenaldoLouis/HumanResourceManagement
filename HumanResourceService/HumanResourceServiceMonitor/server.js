const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ErrorHandler = require("./src/middlewares/ErrorHandlerMiddleware.js")
var cors = require('cors')
const port = 3002
const monitorRoute = require('./src/routes/MonitorRoutes.js')
const userRoute = require('./src/routes/UserRoute.js')
const consumer = require('./consumer');
const setUpWorker = require('./src/bullmq/worker.js');

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use('/api/v1/monitor/users', userRoute)
// app.use('/api/v1/monitorService', monitorRoute)

app.use(ErrorHandler)


setUpWorker();

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})