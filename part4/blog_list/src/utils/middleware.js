import logger from './logger.js'

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  logger.error(error)
}

export { errorHandler }