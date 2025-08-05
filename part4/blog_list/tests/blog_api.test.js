import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import Blog from '../src/models/blog.js'
import helper from './test_helper.js'
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.testBlogList)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blog posts are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 6)
})

test('identifier of the blog posts is named \'id\'', async () => {
  const response = await api.get('/api/blogs')
  assert.notStrictEqual(response.body[0]?.id, undefined)
})

test('HTTP POST request successfully creates a new blog post', async () => {
  const newBlog = helper.testBlogList[0]

  const blogsBeforeAdd = await api.get('/api/blogs')

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAdd = await api.get('/api/blogs')

  assert.strictEqual(blogsBeforeAdd.body.length + 1, blogsAfterAdd.body.length)
})

test('when likes is missing from POST request, it will default to 0', async () => {
  const { ...newBlogWithoutLikes } = helper.testBlogList[0]
  delete newBlogWithoutLikes.likes

  const response = await api.post('/api/blogs')
    .send(newBlogWithoutLikes)

  assert.strictEqual(response.body.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})