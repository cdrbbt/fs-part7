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
      <div>
        title:
        <input
          id="title"
          type="text"
          name="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
       author:
        <input
          id="author"
          type="text"
          name="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
      url:
        <input
          id="url"
          type="text"
          name="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="sendblog">send</button>
    </form>
  )
}

export default BlogCreationFrom