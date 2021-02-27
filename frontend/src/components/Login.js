import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { changeNotification } from '../reducers/notificationReducer'

const Login = ({ setUser }) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({ username: userName, password })
      window.localStorage.setItem('user', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      console.log(loggedInUser)
      setUserName('')
      setPassword('')
      dispatch(changeNotification(`Welcome ${loggedInUser.name}`))
      setUser(loggedInUser)
    } catch (e) {
      dispatch(changeNotification(`Error: ${e.response.data.error}`))
    }
  }

  return (
    <form onSubmit={handleLogin} id="loginform">
      <h2>Login</h2>
      <div>
        username
        <input
          id="username"
          name="Username"
          value={userName}
          type="text"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          name="Password"
          value={password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="loginbutton">login</button>
    </form>
  )
}

export default Login