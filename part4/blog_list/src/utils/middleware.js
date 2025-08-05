import logger from './logger.js'

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'id is improperly formatted' })
  }
  logger.error(error)
}

export { errorHandler }