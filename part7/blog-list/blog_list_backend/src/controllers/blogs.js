import { Router } from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import { userExtractor } from '../utils/middleware.js'
import logger from '../utils/logger.js'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(allBlogs)
  logger.info('Returned all blogs')
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const userId = request.user.id
  const newBlog = new Blog({ ...request.body, user: userId })
  const savedBlog = await newBlog.save()
  const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1, id: 1 })
  await User.findByIdAndUpdate(userId, { $addToSet: { blogs: savedBlog._id } })
  response.status(201).json(populatedBlog)
  logger.info(`Added ${savedBlog.title} to the database.`)
})

blogsRouter.get('/:id', async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })
  if (foundBlog) {
    response.json(foundBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) return response.status(404).end()

  if (request.user.id !== String(blogToDelete.user)) return response.status(403).end()

  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (deletedBlog) {
    await User.findByIdAndUpdate(blogToDelete.user, {
      $pull: { blogs: blogToDelete._id }
    })
    response.status(204).end()
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)

  if (!blogToUpdate) return response.status(404).end()
  if (request.user.id !== String(blogToUpdate.user)) return response.status(403).end()

  const updatedBlog = await Blog.findOneAndReplace({ _id: request.params.id },
    {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes ?? 0,
      user: blogToUpdate.user,
      comments: request.body.comments
    },
    { returnDocument: 'after', runValidators: true })
  response.status(200).json(updatedBlog)
})

blogsRouter.patch('/:id', userExtractor, async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) return response.status(404).end()
  if (request.user.id !== String(blogToUpdate.user)) return response.status(403).end()

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { returnDocument: 'after' })

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  if (!request.body?.comment) return response.status(400).json({ message: 'Error: comment not found' })

  await Blog.findByIdAndUpdate(request.params.id, { $addToSet: { comments: request.body.comment } })

  response.status(201).json({ message: `comment '${request.body.comment}' was added succesfully` })
  logger.info(`Added new comment '${request.body.comment}' to blog with id ${request.params.id}`)
})

export default blogsRouter