import { Router } from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import logger from '../utils/logger.js'
import jwt from 'jsonwebtoken'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(allBlogs)
  logger.info('Returned all blogs')
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({ ...request.body, user: user._id })
  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
  logger.info(`Added ${savedBlog.title} to the database.`)
})

blogsRouter.get('/:id', async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id)
  if (foundBlog) {
    response.json(foundBlog)
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