import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogCreationFrom from './components/BlogCreationForm'
import Toggleable from './components/Toggleable'
import { changeNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs } from './reducers/blogsReducer'
import { checkLocal, logout } from './reducers/userReducer'
import { Switch, Link, Route } from 'react-router-dom'
import Users from './components/Users'

const App = () => {

  const noteToggle = useRef()
  const [blogs, user] = useSelector(state => [state.blogs, state.user])

  const dispatch = useDispatch()

  //blogs arent shown when not logged in but still loaded
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(checkLocal())
  }, [dispatch])

  const logoutUser = () => {
    dispatch(logout())
  }

  //!!the response from blog creation returns a blog object with the user field not populated
  const createBlog = (blog) => {
    dispatch(addBlog(blog))
    dispatch(changeNotification(`Blog ${blog.title} by ${blog.author} created`))
    noteToggle.current.toggleVisibility()
  }

  const login = () => (
    <Login />
  )

  const blog = () => (
    <>
      <div>{`${user.name} logged in`}</div>
      <button onClick={logoutUser}>Logout</button>
      <Switch>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/'>
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
        </Route>
      </Switch>

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