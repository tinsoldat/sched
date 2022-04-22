import express from 'express'
import dotenv from 'dotenv'

import router from './routes.js'
import wikiwiki from './services/wikiwiki.js'
const config = dotenv.config()

const app = express()

const PORT = process.env.PORT ?? 5000

app.use('/api/schedule', router)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

wikiwiki(199)

