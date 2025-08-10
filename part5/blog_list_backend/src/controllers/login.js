import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/user.js'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username: username })
  const passwordCorrect = await bcrypt.compare(password, user?.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'Invalid username and/or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})


export default loginRouter