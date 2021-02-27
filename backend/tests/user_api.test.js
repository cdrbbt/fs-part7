const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (const user of helper.initalUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
})

describe('User creation', () => {

  test('a user without a password cannot be created', async() => {
    const user = {
      username: 'labrat',
      name: 'stuart'
    }

    const res = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    //server throws the same error for no password and short password since there is no reason to diffirentiate at the this time
    expect(res.body.error).toContain('at least 3 characters long')
  })

  test('a user without a username cannot be created', async() => {
    const user = {
      name: 'stuart',
      password: 'little'
    }

    const res = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(res.body.error).toContain('`username` is required')
  })

  test('a user with a username shorter than 3 characters cannot be created', async() => {
    const user = {
      username: 'la',
      name: 'stuart',
      password: 'little'
    }

    const res = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(res.body.error).toContain('shorter than the minimum allowed length')
  })

  test('a user with a password shorter than 3 characters cannot be created', async() => {
    const user = {
      username: 'labrat',
      name: 'stuart',
      password: 'li'
    }

    const res = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(res.body.error).toContain('password must be at least 3 characters long')
  })

  test('a user with a non unique username cannot be created', async() => {
    const user = {
      name: 'imposter',
      password: 'valid',
      username: helper.initalUsers[0].username
    }
    const res = await api
      .post('/api/users')
      .send(user)
      .expect(400)

      expect(res.body.error).toContain('to be unique')
  })
  
})

afterAll(() => {
  mongoose.connection.close()
})