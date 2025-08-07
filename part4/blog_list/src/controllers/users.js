import { Router } from 'express'
import bcrypt from 'bcrypt'
import logger from '../utils/logger.js'
import User from '../models/user.js'

const usersRouter = Router()

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
  logger.info('Received a POST request on the Users API')
  const { password, ...userData } = request.body
  if (!password || password.length < 3) {
    const error = new Error('Request must include a valid password with 3 or more characters.')
    error.name = 'ValidationError'
    throw error
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({ ...userData, passwordHash: passwordHash })
  const result = await newUser.save()
  response.status(201).json(result)
})


export default usersRouter