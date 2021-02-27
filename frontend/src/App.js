import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogCreationFrom from './components/BlogCreationForm'
import Toggleable from './components/Toggleable'
import { changeNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs } from './reducers/blogsReducer'

const App = () => {

  const noteToggle = useRef()
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  //blogs arent shown when not logged in but still loaded?
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('user')
    if (savedUser) {
      const loggedInUser = JSON.parse(savedUser)
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  //!!the response from blog creation returns a blog object with the user field not populated
  const createBlog = (blog) => {
    dispatch(addBlog(blog))
    dispatch(changeNotification(`Blog ${blog.title} by ${blog.author} created`))
    noteToggle.current.toggleVisibility()
  }

  const login = () => (
    <Login
      setUser={setUser}
    />
  )

  const blog = () => (
    <>
      <button onClick={logout}>Logout</button>
      <Toggleable
        buttonLabel="new note"
        ref={noteToggle}>
        <BlogCreationFrom
          createBlog={createBlog}
        />
      </Toggleable>
      <h2>blogs</h2>
      <div id="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>

    </>
  )

  return (
    <div>
      <Notification />
      {user === null
        ? login()
        : blog()
      }
    </div>
  )
}

export default App