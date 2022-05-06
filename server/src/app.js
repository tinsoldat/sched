const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const eventsRouter = require('./routes/events.router.js')
const liversRouter = require('./routes/livers.router')
const fetchWiki = require('./services/wikiwiki.js')
const Event = require('./models/Event')

const config = dotenv.config()

const app = express()

const PORT = process.env.PORT ?? 5000
const DATABASE = process.env.DATABASE ?? 'mongodb://127.0.0.1:27017/test'

app.use('/api/events/', eventsRouter)
app.use('/api/livers/', liversRouter)

const start = async () => {
  try {
    await mongoose.connect(DATABASE)
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))    
  } catch (error) {
    console.log(error)
  }
}

start()