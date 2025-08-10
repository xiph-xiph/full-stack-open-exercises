import { test, after, before, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app.js'
import User from '../src/models/user.js'
import helper from './test_helper.js'
import jwt from 'jsonwebtoken'

const api = supertest(app)

before(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(helper.newTestUser)
})

describe('Login API POST /api/login', () => {
  test('should return name, username, and a valid token when provided with existing username and corresponding password', async () => {
    const response = await api.post('/api/login')
      .send({
        username: helper.newTestUser.username,
        password: helper.newTestUser.password
      })
      .expect(200)

    assert.strictEqual(response.body.name, helper.newTestUser.name)
    assert.strictEqual(response.body.username, helper.newTestUser.username)

    const decodedToken = jwt.verify(response.body.token, process.env.SECRET)
    assert.strictEqual(decodedToken.username, helper.newTestUser.username)
  })
})

after(async () => {
  await mongoose.connection.close()
})