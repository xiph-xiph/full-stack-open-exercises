/* eslint-disable no-unused-vars */
import logger from './logger.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.user = await User.findById(decodedToken.id)
  if (!request.user) {
    const error = new Error('authentication failed: user does not exist')
    error.name = 'JsonWebTokenError'
    throw error
  }
  next()
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

export { tokenExtractor, userExtractor, errorHandler }