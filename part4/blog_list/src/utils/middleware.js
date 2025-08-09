/* eslint-disable no-unused-vars */
import logger from './logger.js'

const tokenExtractor = (request, response) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
}

const errorHandler = (error, request, response, next) => {

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'id is improperly formatted' })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }
  logger.error(error)
  return response.status(500).json({ error: 'Internal server error' })
}

export { tokenExtractor, errorHandler }