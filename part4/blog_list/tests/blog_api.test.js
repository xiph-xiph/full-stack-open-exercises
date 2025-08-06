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
      .send(newBlogWithoutLikes)

    assert.strictEqual(response.body.likes, 0)
  })

  test('should return 400 when title property is missing', async () => {
    const { ...newBlog } = helper.testBlogList[0]
    delete newBlog.title

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('should return 400 when url property is missing', async () => {
    const { ...newBlog } = helper.testBlogList[0]
    delete newBlog.url

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)
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
  test('should delete blog post and return 204 when valid id is provided', async () => {

    const blogsBeforeDelete = await api.get('/api/blogs')

    const blogToDelete = blogsBeforeDelete.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDelete = await api.get('/api/blogs')

    assert.strictEqual(blogsBeforeDelete.body.length - 1, blogsAfterDelete.body.length)

    const remainingIds = blogsAfterDelete.body.map(blog => blog.id)
    assert.ok(!remainingIds.includes(blogToDelete.id))
  })

  test('should return 404 when trying to delete nonexistent blog post', async () => {
    const nonexistentId = '000000000000000000000000'
    await api.delete(`/api/blogs/${nonexistentId}`)
      .expect(404)
  })

  test('should return 400 when id format is invalid', async () => {
    const malformattedId = 'ThisIdIsMalformatted'
    await api.delete(`/api/blogs/${malformattedId}`)
      .expect(400)
  })
})

describe('Blog API PUT /api/blogs/:id', () => {
  let blogToBeEdited
  let newBlogTemplate
  beforeEach(async () => {
    blogToBeEdited = await Blog.create(helper.blogToBeEdited)
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
      .send(newBlog)
      .expect(400)
  })

  test('should return 400 when title property is missing', async () => {
    const newBlog = { ...newBlogTemplate }
    delete newBlog.title
    await api.put(`/api/blogs/${blogToBeEdited.id}`)
      .send(newBlog)
      .expect(400)
  })

  test('should return 400 when url property is missing', async () => {
    const newBlog = { ...newBlogTemplate }
    delete newBlog.url
    await api.put(`/api/blogs/${blogToBeEdited.id}`)
      .send(newBlog)
      .expect(400)
  })

  test('should update blog post and return updated blog with status 200 when valid data is provided', async () => {
    const newBlog = { ...newBlogTemplate }
    const response = await api.put(`/api/blogs/${blogToBeEdited.id}`)
      .send(newBlog)
      .expect(200)
    assert.deepStrictEqual(response.body, { ...newBlog, id: response.body.id })
  })

  test('should create a new entry at specified resource id and return updated blog with status 201 when it is valid but doesn\'t exist yet', async () => {
    const newBlog = { ...newBlogTemplate }
    const response = await api.put('/api/blogs/0123456789abcdef01234567')
      .send(newBlog)
      .expect(201)
    assert.deepStrictEqual(response.body, { ...newBlog, id: '0123456789abcdef01234567' })
  })
})

describe('Blog API PATCH /api/blogs/:id', () => {
  let blogToBeEdited
  let newBlogTemplate
  beforeEach(async () => {
    blogToBeEdited = await Blog.create(helper.blogToBeEdited)
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
      .send(newBlog)
      .expect(400)
  })

  test('should return 404 when blog post does not exist', async () => {
    const newBlog = { author: newBlogTemplate.author }
    const nonexistentId = '000000000000000000000000'
    await api.patch(`/api/blogs/${nonexistentId}`)
      .send(newBlog)
      .expect(404)
  })

  test('should leave other properties unchanged when updating only specific fields', async () => {
    const newBlog = { author: newBlogTemplate.author }
    const response = await api.patch(`/api/blogs/${blogToBeEdited.id}`)
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
      .send(newBlog)
      .expect(200)

    const expectedBlog = { ...helper.blogToBeEdited, id: response.body.id }
    assert.deepStrictEqual(response.body, expectedBlog)
  })
})

after(async () => {
  await mongoose.connection.close()
})