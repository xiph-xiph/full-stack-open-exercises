import { Router } from 'express'
import Blog from '../models/blog.js'
import logger from '../utils/logger.js'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  logger.info('Returned all blogs')
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
  logger.info(`Added ${result.title} to the database.`)
})

export default blogsRouter