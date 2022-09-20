const { Router } = require('express')
const helloRouter = require('./hello')

const apiRoutes = Router()

apiRoutes.use('/hello', helloRouter)

module.exports = apiRoutes
