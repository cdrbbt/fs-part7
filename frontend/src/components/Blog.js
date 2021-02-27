import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { changeNotification } from '../reducers/notificationReducer'

//Toggleable seems to actually work just fine?
//import Toggleable from './Toggleable'

const Blog = ({ blog }) => {

  const [visibility, setVisibility] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlog = () => {
    if (window.confirm(`Delete blog ${blog.title}?`)){
      dispatch(deleteBlog(blog))
      dispatch(changeNotification('Blog deleted'))
    }
  }

  const label = visibility ? 'hide' : 'details'

  const changeVisibility = () => setVisibility(!visibility)

  const blogDeletion = () => {
    const loggedInAs = JSON.parse(window.localStorage.getItem('user')).username
    if (blog.user.username !== loggedInAs) return null
    return (<button onClick={() => removeBlog(blog)}>delete</button>)
  }

  const like = () => {
    dispatch(likeBlog(blog))
  }

  const details = () => {
    if (!visibility) return null
    return (
      <div className="details">
        <p>{`url: ${blog.url}`}</p>
        <p>likes: <span className="likes">{`${blog.likes}`}</span> <button onClick={like} id="likeButton">Like</button></p>
        {blogDeletion()}
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



export default Blog
