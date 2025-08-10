import { test, after, before, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import Blog from '../src/models/blog.js'
import User from '../src/models/user.js'
import helper from './test_helper.js'
import jwt from 'jsonwebtoken'

const api = supertest(app)

let token
let userId
before(async () => {
  await User.deleteMany({})
  const response = await api.post('/api/users').send(helper.newTestUser)
  token = jwt.sign({ username: response.body.username, id: response.body.id }, process.env.SECRET)
  userId = response.body.id
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const newBlogList = helper.testBlogList.map((blog) => (
    { ...blog, user: userId }
  ))
  await Blog.insertMany(newBlogList)
})

describe('Blog API GET /api/blogs', () => {
  test('should return blogs as JSON with status 200', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should return correct number of blog posts', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })

  test('should return blog posts with identifier named \'id\'', async () => {
    const response = await api.get('/api/blogs')
    assert.notStrictEqual(response.body[0]?.id, undefined)
  })
})

describe('Blog API POST /api/blogs', () => {
  test('should create new blog post with status 201', async () => {
    const newBlog = helper.testBlogList[0]

    const blogsBeforeAdd = await api.get('/api/blogs')

    await api.post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdd = await api.get('/api/blogs')

    assert.strictEqual(blogsBeforeAdd.body.length + 1, blogsAfterAdd.body.length)
  })

  test('should default likes to 0 when likes property is missing', async () => {
    const { ...newBlogWithoutLikes } = helper.testBlogList[0]
    delete newBlogWithoutLikes.likes

    const response = await api.post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlogWithoutLikes)

    assert.strictEqual(response.body.likes, 0)
  })

  test('should return 400 when title property is missing', async () => {
    const { ...newBlog } = helper.testBlogList[0]
    delete newBlog.title

    await api.post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)
  })

  test('should return 400 when url property is missing', async () => {
    const { ...newBlog } = helper.testBlogList[0]
    delete newBlog.url

    await api.post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)
  })

  test('should return 401 and not create a new blog when valid token is not supplied', async () => {
    const { ...newBlog } = helper.testBlogList[0]

    const blogsBeforeAdd = await api.get('/api/blogs')

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAfterAdd = await api.get('/api/blogs')

    assert.strictEqual(blogsBeforeAdd.body.length, blogsAfterAdd.body.length)
  })
})

describe('Blog API GET /api/blogs/:id', () => {
  test('should return specific blog post when valid id is provided', async () => {
    const blogs = await api.get('/api/blogs')
    const blogToGet = blogs.body[0]
    const response = await api.get(`/api/blogs/${blogToGet.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body, blogToGet)
  })

  test('should return 404 when blog post does not exist', async () => {
    const nonexistentId = '000000000000000000000000'
    await api.get(`/api/blogs/${nonexistentId}`)
      .expect(404)
  })

  test('should return 400 when id format is invalid', async () => {
    const malformattedId = 'ThisIdIsMalformatted'
    await api.get(`/api/blogs/${malformattedId}`)
      .expect(400)
  })
})

describe('Blog API DELETE /api/blogs/:id', () => {
  test('should delete blog post and return 204 when valid id with valid token is provided', async () => {
    const blogsBeforeDelete = await api.get('/api/blogs')

    const blogToDelete = blogsBeforeDelete.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)

    const blogsAfterDelete = await api.get('/api/blogs')

    assert.strictEqual(blogsBeforeDelete.body.length - 1, blogsAfterDelete.body.length)

    const remainingIds = blogsAfterDelete.body.map(blog => blog.id)
    assert.ok(!remainingIds.includes(blogToDelete.id))
  })

  test('should return 404 when trying to delete nonexistent blog post', async () => {
    const nonexistentId = '000000000000000000000000'
    await api.delete(`/api/blogs/${nonexistentId}`)
      .auth(token, { type: 'bearer' })
      .expect(404)
  })

  test('should return 400 when id format is invalid', async () => {
    const malformattedId = 'ThisIdIsMalformatted'
    await api.delete(`/api/blogs/${malformattedId}`)
      .auth(token, { type: 'bearer' })
      .expect(400)
  })

  test('should return 401 and not delete the blog when valid token is not supplied', async () => {
    const blogsBeforeDelete = await api.get('/api/blogs')

    const blogToDelete = blogsBeforeDelete.body[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAfterDelete = await api.get('/api/blogs')

    assert.strictEqual(blogsBeforeDelete.body.length, blogsAfterDelete.body.length)
  })

  test('should return 403 and not delete the blog when the blog does not belong to the user', async () => {
    const wrongUser = await api.post('/api/users').send(helper.newTestUser2)
    const wrongToken = jwt.sign({ username: wrongUser.body.username, id: wrongUser.body.id }, process.env.SECRET)

    const blogsBeforeDelete = await api.get('/api/blogs')

    const blogToDelete = blogsBeforeDelete.body[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .auth(wrongToken, { type: 'bearer' })
      .expect(403)

    const blogsAfterDelete = await api.get('/api/blogs')

    assert.strictEqual(blogsBeforeDelete.body.length, blogsAfterDelete.body.length)
  })
})

describe('Blog API PUT /api/blogs/:id', () => {
  let blogToBeEdited
  let newBlogTemplate
  beforeEach(async () => {
    blogToBeEdited = await Blog.create({ ...helper.blogToBeEdited, user: userId })
    newBlogTemplate = {
      title: 'Epic Blog Title',
      author: 'Joe Stone',
      url: 'verycoolurl.com',
      likes: 1
    }
  })

  test('should return 400 when id format is invalid', async () => {
    const newBlog = { ...newBlogTemplate }
    const invalidId = 'ThisIdIsMalformatted'
    await api.put(`/api/blogs/${invalidId}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)
  })

  test('should return 400 when title property is missing', async () => {
    const newBlog = { ...newBlogTemplate }
    delete newBlog.title
    await api.put(`/api/blogs/${blogToBeEdited.id}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)
  })

  test('should return 400 when url property is missing', async () => {
    const newBlog = { ...newBlogTemplate }
    delete newBlog.url
    await api.put(`/api/blogs/${blogToBeEdited.id}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)
  })

  test('should update blog post and return updated blog with status 200 when valid data is provided', async () => {
    const newBlog = { ...newBlogTemplate }
    const response = await api.put(`/api/blogs/${blogToBeEdited.id}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(200)
    assert.deepStrictEqual(response.body, { ...newBlog, id: response.body.id, user: userId })
  })

  test('should return 403 and not update the blog when the blog does not belong to the user'), async () => {
    const wrongUser = await api.post('/api/users').send(helper.newTestUser2)
    const wrongToken = jwt.sign({ username: wrongUser.body.username, id: wrongUser.body.id }, process.env.SECRET)
    const blogBeforeUpdate = await api.get(`/api/blogs/${blogToUpdate.id}`)

    const newBlog = { ...newBlogTemplate }
    const blogToUpdate = blogBeforeUpdate.body[0]
    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .auth(wrongToken, { type: 'bearer' })
      .send(newBlog)
      .expect(403)

    const blogAfterUpdate = await api.get(`/api/blogs/${blogToUpdate.id}`)

    assert.deepStrictEqual(blogBeforeUpdate, blogAfterUpdate)
  }
})

describe('Blog API PATCH /api/blogs/:id', () => {
  let blogToBeEdited
  let newBlogTemplate
  beforeEach(async () => {
    blogToBeEdited = await Blog.create({ ...helper.blogToBeEdited, user: userId })
    newBlogTemplate = {
      title: 'Epic Blog Title',
      author: 'Joe Stone',
      url: 'verycoolurl.com',
      likes: 1
    }
  })

  test('should return 400 when id format is invalid', async () => {
    const newBlog = { author: newBlogTemplate.author }
    const invalidId = 'ThisIdIsMalformatted'
    await api.patch(`/api/blogs/${invalidId}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)
  })

  test('should return 404 when blog post does not exist', async () => {
    const newBlog = { author: newBlogTemplate.author }
    const nonexistentId = '000000000000000000000000'
    await api.patch(`/api/blogs/${nonexistentId}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(404)
  })

  test('should leave other properties unchanged when updating only specific fields', async () => {
    const newBlog = { author: newBlogTemplate.author }
    const response = await api.patch(`/api/blogs/${blogToBeEdited.id}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(200)

    assert.strictEqual(response.body.author, newBlog.author)
    assert.strictEqual(response.body.title, blogToBeEdited.title)
    assert.strictEqual(response.body.url, blogToBeEdited.url)
    assert.strictEqual(response.body.likes, blogToBeEdited.likes)
  })

  test('should return 200 with no changes when empty object is sent', async () => {
    const newBlog = {}
    const response = await api.patch(`/api/blogs/${blogToBeEdited.id}`)
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(200)

    const expectedBlog = { ...helper.blogToBeEdited, id: response.body.id }
    assert.deepStrictEqual(response.body, { ...expectedBlog, user: userId })
  })

  test('should return 403 and not update the blog when the blog does not belong to the user'), async () => {
    const wrongUser = await api.post('/api/users').send(helper.newTestUser2)
    const wrongToken = jwt.sign({ username: wrongUser.body.username, id: wrongUser.body.id }, process.env.SECRET)
    const blogBeforeUpdate = await api.get(`/api/blogs/${blogToUpdate.id}`)

    const newBlog = { author: newBlogTemplate.author }
    const blogToUpdate = blogBeforeUpdate.body[0]
    await api.patch(`/api/blogs/${blogToUpdate.id}`)
      .auth(wrongToken, { type: 'bearer' })
      .send(newBlog)
      .expect(403)

    const blogAfterUpdate = await api.get(`/api/blogs/${blogToUpdate.id}`)

    assert.deepStrictEqual(blogBeforeUpdate, blogAfterUpdate)
  }
})

after(async () => {
  await mongoose.connection.close()
})