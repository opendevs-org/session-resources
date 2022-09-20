const express = require('express')
const apiRoutes = require('./routes')

const app = express()

app.use('/api', apiRoutes)

app.use((req, res) => {
  return res.status(404).send('Route not found')
})

module.exports = { app }
