const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const decodedToken = jwt.decode(req.token, process.env.SECRET)

  if (!req.token || !decodedToken) {
    return res.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)
  const blog = req.body
  blog.user = user._id
  const blogObject = new Blog(blog)
  const savedBlog = await blogObject.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {

  const decodedToken = jwt.decode(req.token, process.env.SECRET)

  if (!req.token || !decodedToken) {
    return res.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === user._id.toString()){
    await blog.delete()

    // removes the reference to the deleted blog from the user, interestingly no errors have occured when not doing this
    user.blogs = user.blogs.filter(b => b.toString() !== req.params.id)
    await user.save()
    return res.status(204).end()
  }
  return res.status(401).json({error: 'wrong user'})
})

blogsRouter.post('/:id/comments', async (req, res) => {
  console.log(req.params.id)
  const blog = await Blog.findById(req.params.id)
  console.log(blog)
  console.log(req.body)
  blog.comments = blog.comments.concat(req.body.comment)
  const updatedBlog = await blog.save()
  res.json(updatedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findById(req.params.id, {likes: req.body.likes}, {new: true}).populate('user', {username: 1, name: 1})

  res.json(updatedBlog)
})

module.exports = blogsRouter