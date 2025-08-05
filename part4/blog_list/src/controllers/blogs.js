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

blogsRouter.get('/:id', async (request, response) => {
  const blogFound = await Blog.findById(request.params.id)
  if (blogFound) {
    response.json(blogFound)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (deletedBlog) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  if (blogToUpdate) {
    const updatedBlog = await Blog.findOneAndReplace({ _id: request.params.id }, request.body, { returnDocument: 'after', runValidators: true })
    response.status(200).json(updatedBlog)
    return
  }
  const newBlog = new Blog({ ...request.body, _id: request.params.id })
  const createdBlog = await newBlog.save()
  response.status(201).json(createdBlog)
})

blogsRouter.patch('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { returnDocument: 'after' })
  if (!updatedBlog) {
    response.status(404).end()
    return
  }
  response.json(updatedBlog)
})

export default blogsRouter