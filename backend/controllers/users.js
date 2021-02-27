const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

//Create a new user
usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password || body.password.length < 3) {
    const passError = new Error ('password must be at least 3 characters long')
    passError.name = 'passwordError'
    throw passError
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  
  const savedUser = await user.save()

  res.json(savedUser)
})

//Fetch all users
usersRouter.get('/', async(req, res) => {
  const users = await User.find({}).populate('blogs', {title: 1, url:1})

  res.json(users)
})

module.exports = usersRouter