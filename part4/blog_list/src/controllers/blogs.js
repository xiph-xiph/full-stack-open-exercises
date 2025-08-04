import { Router } from 'express'
import Blog from '../models/blog.js'
import logger from '../utils/logger.js'

const blogsRouter = Router()

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
    logger.info('Returned all blogs')
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
    logger.info(`Added ${blog.title} to the database.`)
  })
})

export default blogsRouter