import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import User from '../src/models/user.js'
import helper from './test_helper.js'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.testUsers)
})

describe('User API GET /api/users', () => {
  test('should return users as JSON with status 200', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should return correct number of users', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, helper.testUsers.length)
  })

  test('should return users with identifier named \'id\'', async () => {
    const response = await api.get('/api/users')
    assert.notStrictEqual(response.body[0]?.id, undefined)
  })
})

describe('User API POST /api/users', () => {
  test('should create new user with status 201', async () => {
    const usersBeforeAdd = await api.get('/api/users')

    await api
      .post('/api/users')
      .send(helper.newTestUser)
      .expect(201)

    const usersAfterAdd = await api.get('/api/users')

    assert.strictEqual(usersBeforeAdd.body.length + 1, usersAfterAdd.body.length)
  })

  test('should return 400 when username is missing from request', async () => {
    const { ...newUser } = helper.newTestUser
    delete newUser.username

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('should return 400 when username is shorter than 3 characters', async () => {
    const { ...newUser } = helper.newTestUser
    newUser.username = 'al'

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('should return 400 when password is missing from request', async () => {
    const { ...newUser } = helper.newTestUser
    delete newUser.password

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('should return 400 when password is shorter than 3 characters', async () => {
    const { ...newUser } = helper.newTestUser
    newUser.password = 'p8'

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})