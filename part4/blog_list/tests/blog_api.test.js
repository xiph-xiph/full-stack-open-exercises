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
  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, 6)
})

after(async () => {
  await mongoose.connection.close()
})