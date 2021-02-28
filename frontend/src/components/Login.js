import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { Button, TextField } from '@material-ui/core'

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
        <TextField
          id="username"
          name="Username"
          value={userName}
          type="text"
          label='Username'
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          name="Password"
          value={password}
          type="password"
          label='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit" id="loginbutton" color='primary' variant='contained'>login</Button>
    </form>
  )
}

export default Login