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
    //setBLogs(blogs.concat(data))
    noteToggle.current.toggleVisibility()
  }

  const updateBlog = async(blog) => {

    //server should ignore everything but the likes field, but following insturctions just in case
    //once again updating a blog returns a blog with an unpopulated user field
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    try {
      const newBlog = await blogService.update(updatedBlog)

      //blogs jump after like update due to sorting
      const updatedBlogs = blogs.filter(b => b.id !== blog.id).concat(newBlog)
      //setBLogs(updatedBlogs.sort((a,b) => b.likes - a.likes))
    } catch (e) {
      console.log(e)
      dispatch(changeNotification(`Error: ${e.response.data.error}`))

    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title}?`)){
      try {
        await blogService.remove(blog)
        dispatch(changeNotification('Blog deleted'))

        //setBLogs(blogs.filter(b => b.id !==blog.id))
      } catch (e) {
        console.log(e)
        dispatch(changeNotification(`Error: ${e.response.data.error}`))
      }
    }
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
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
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