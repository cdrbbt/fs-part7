/// <reference types="jest" />

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.intialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

const api = supertest(app)

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.intialBlogs.length)
})

test('blogs have an id field', async() => {
  const res = await api.get('/api/blogs')
  const ids = res.body.map(r => r.id)

  for (const id of ids) {
    expect(id).toBeDefined()
  }
})

describe('Blog creation', () => {

  let token

  //hardcoded user, the user test adds users directly to db without hashing passwords so loggging in with helper credentials doesnt work
  beforeAll( async () => {
    const res = await api.post('/api/login').send({username: 'sjack', password:'ladle'})
    console.log('res', res.body)
    token = 'Bearer ' + res.body.token
    console.log(token)
  })

  test('creating a new blog', async() => {
    const newBlog = {
      title: 'How to test the create function of a server',
      author: 'Egor B.',
      url: 'http://localhost/1',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDB()
    expect(blogsAfterOperation).toHaveLength(helper.intialBlogs.length + 1)

    expect(blogsAfterOperation.map(b => b.title)).toContain('How to test the create function of a server')
  
    // expect(blogsAfterOperation).toMatchObject(newBlog)

  })

  test('creating a blog without likes will default the value to 0', async () => {
    const newBlog = {
      title: 'Testing if sending a request without a field will crash the server, part1',
      author: 'Egor B.',
      url: 'http://localhost/2'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    // will break if blogs arent returned in order
    const blogsAfterOperation = await helper.blogsInDB()
    const lastBlog = blogsAfterOperation[blogsAfterOperation.length-1]
    expect(lastBlog.likes).toBe(0)
  })

  test('creating a blog without a title will return code 400', async () => {
    const newBlog = {
      author: 'Egor B.',
      url: 'http://localhost/2',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
  })


  test('creating a blog without an url will return code 400', async () => {
    const newBlog = {
      author: 'Egor B.',
      title: 'urless blog',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
  })

  test('trying to create a blog without an auth token will fail with code 401', async () => {
    const newBlog = {
      title: 'How to test the create function of a server',
      author: 'Egor B.',
      url: 'http://localhost/1',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAfterOperation = await helper.blogsInDB()
    expect(blogsAfterOperation).toHaveLength(helper.intialBlogs.length)
  })
})



afterAll(() => {
  mongoose.connection.close()
})