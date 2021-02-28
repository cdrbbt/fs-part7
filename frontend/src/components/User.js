import { List, ListItem, ListItemText, ListSubheader } from '@material-ui/core'
import React from 'react'

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <List>
        <ListSubheader>Added blogs</ListSubheader>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemText>
              {blog.title}
            </ListItemText>
          </ListItem>)}
      </List>
    </div>
  )
}

export default User