import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ user, logout }) => {
  const loggedin = user ?
    <><h3>{`${user.name} logged in`}</h3>
      <Button onClick={logout} color='secondary' variant='outlined' mx={2}>Logout</Button></>
    : null


  return(
    <AppBar position='static'>
      <Toolbar>
        <Button mx={2}><Link to='/'>blogs</Link></Button>
        <Button mx={2}><Link to='/users'>users</Link></Button>
        {loggedin}
      </Toolbar>

    </AppBar>
  )
}

export default Navigation