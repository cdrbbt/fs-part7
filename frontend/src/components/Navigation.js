import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return(
    <div>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
    </div>
  )
}

export default Navigation