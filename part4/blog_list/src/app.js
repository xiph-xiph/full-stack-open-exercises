import mongoose from 'mongoose'
import express from 'express'
import { MONGODB_URI } from './utils/config.js'
import blogsRouter from './controllers/blogs.js'
import logger from './utils/logger.js'
import { errorHandler } from './utils/middleware.js'
const app = express()

logger.info('Connecting to MongoDB...')

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('Succesfully connected to MongoDB')
  })
  .catch((error) => {
    logger.error(`Could not connect to MongoDB: ${error}`)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

export default app