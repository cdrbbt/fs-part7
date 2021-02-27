import blogService from '../services/blogs'

const initialBlogs = []

const reducer = (state = initialBlogs, action) => {
  switch(action.type){
  case 'INIT': {
    return action.blogs
  }
  case 'ADD': {
    const updatedBlogs = sortBlogs(state.concat(action.blog))
    return updatedBlogs
  }
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      blogs: sortBlogs(blogs)
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD',
      blog: returnedBlog
    })
  }
}

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

export default reducer