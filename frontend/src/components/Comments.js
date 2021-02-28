import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const change = (event) => {
    setComment(event.target.value)
  }

  const send = () => {
    dispatch(commentBlog(blog, comment))
  }

  return (
    <div>
      <input onChange={change} value={comment}/>
      <button onClick={send}>send</button>
      <ul>
        {blog.comments.map( c => <li key={c}>{c}</li>)}
      </ul>
    </div>
  )
}

export default Comments