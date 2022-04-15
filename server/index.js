const express = require('express')
const dotenv = require('dotenv').config()

const app = express()

const PORT = process.env.PORT ?? 5000

app.use('/api/schedule', require('./routes/schedule.routes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))