import { Button, List, TextField, ListItem } from '@material-ui/core'
import React, { useState } from 'react'

const BlogCreationFrom = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, url, author })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <List>
        <ListItem>
          <TextField
            m={1}
            id="title"
            type="text"
            label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

        </ListItem>


        <ListItem>
          <TextField
            m={1}
            id="author"
            type="text"
            label="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </ListItem>

        <ListItem>
          <TextField
            m={1}
            id="url"
            type="text"
            label="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </ListItem>

      </List>

      <Button type="submit" id="sendblog" color='primary' variant='contained'>send</Button>
    </form>
  )
}

export default BlogCreationFrom