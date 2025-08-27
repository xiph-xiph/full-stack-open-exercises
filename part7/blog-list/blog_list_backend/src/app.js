import mongoose from 'mongoose'
import express from 'express'
import { MONGODB_URI } from './utils/config.js'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testingRouter from './controllers/testing.js'
import logger from './utils/logger.js'
import { tokenExtractor, errorHandler } from './utils/middleware.js'
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
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}
app.use(errorHandler)

export default app