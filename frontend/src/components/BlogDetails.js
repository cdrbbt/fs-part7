import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import Comments from './Comments'

const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  if (!blog) return null
  console.log(blog)
  const like = () => {
    dispatch(likeBlog(blog))
  }
  return(
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>{`${blog.likes} likes`}<button onClick={like}>Like</button></div>
      <div>{`made by ${blog.author}`}</div>
      <Comments blog={blog}/>
    </div>
  )
}

export default BlogDetails