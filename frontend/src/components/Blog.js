import React, { useState } from 'react'
import PropTypes from 'prop-types'

//Toggleable seems to actually work just fine?
//import Toggleable from './Toggleable'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visibility ? 'hide' : 'details'

  const changeVisibility = () => setVisibility(!visibility)

  const removeBlog = () => {
    const loggedInAs = JSON.parse(window.localStorage.getItem('user')).username
    if (blog.user.username !== loggedInAs) return null
    return (<button onClick={() => deleteBlog(blog)}>delete</button>)
  }

  const like = () => {
    updateBlog(blog)
  }

  const details = () => {
    if (!visibility) return null
    return (
      <div className="details">
        <p>{`url: ${blog.url}`}</p>
        <p>likes: <span className="likes">{`${blog.likes}`}</span> <button onClick={like} id="likeButton">Like</button></p>
        {removeBlog()}
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      {`${blog.title} by ${blog.author}`}
      <button onClick={changeVisibility} className="visibilityToggle">{label}</button>
      {details()}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
