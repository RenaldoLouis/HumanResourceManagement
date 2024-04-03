const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ErrorHandler = require("./src/middlewares/ErrorHandlerMiddleware.js")
var cors = require('cors')
const port = 3001
const attendanceRoute = require('./src/routes/AttendanceRoutes.js')
const userRoute = require('./src/routes/UserRoute.js')

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use('/api/v1/users', userRoute)
app.use('/api/v1/attendenceService', attendanceRoute)

app.use(ErrorHandler)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})