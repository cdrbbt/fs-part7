import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Login = ({ setUser, setMessage }) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({ username: userName, password })
      window.localStorage.setItem('user', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      console.log(loggedInUser)
      setUserName('')
      setPassword('')
      setMessage(`Welcome ${loggedInUser.name}`)
      setTimeout(() => setMessage(null), 5000)
      setUser(loggedInUser)
    } catch (e) {
      setMessage(`Error: ${e.response.data.error}`)
      setTimeout(() => setMessage(null), 5000)
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

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired
}

export default Login