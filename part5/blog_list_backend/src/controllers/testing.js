import { Router } from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const testingRouter = Router()

testingRouter.post('/reset', async (request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  response.status(204).end()
})

export default testingRouter