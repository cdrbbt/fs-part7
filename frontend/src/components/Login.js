import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'

const Login = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin =  (event) => {
    event.preventDefault()
    dispatch(logIn({ username: userName, password }))
    setUserName('')
    setPassword('')
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