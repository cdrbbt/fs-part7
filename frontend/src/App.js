import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogCreationFrom from './components/BlogCreationForm'
import Toggleable from './components/Toggleable'
import { changeNotification } from './reducers/notificationReducer'
import { addBlog, initializeBlogs } from './reducers/blogsReducer'
import { checkLocal, logout } from './reducers/userReducer'
import { Switch, Link, Route, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import userService from './services/users'
import BlogDetails from './components/BlogDetails'
import Navigation from './components/Navigation'

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

  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getUsers().then( users => setUsers(users))
  }, [])


  const matchUser = useRouteMatch('/users/:id')
  const selectedUser = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const selectedBlog = matchBlog
    ? blogs.find(u => u.id === matchBlog.params.id)
    : null

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
      <Navigation/>
      <div>{`${user.name} logged in`}</div>
      <button onClick={logoutUser}>Logout</button>
      <Switch>
        <Route path='/users/:id'>
          <User user={selectedUser}/>
        </Route>
        <Route path='/users'>
          <Users users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          <BlogDetails blog={ selectedBlog }/>
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