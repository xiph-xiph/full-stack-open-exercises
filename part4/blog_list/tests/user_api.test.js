import { test, after, beforeEach, describe } from 'node:test'
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

describe('User API POST /api/users', () => {
  test('dummy', async () => {
    const password = 'VerySafePassword'
    await api
      .post('/api/blogs')
      .send({ password: password })
      .expect(201)
  })
})

after(async () => {
  await mongoose.connection.close()
})