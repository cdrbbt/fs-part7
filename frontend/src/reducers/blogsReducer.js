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
  case 'LIKE': {
    const updatedBlogs = state.filter(b => b.id !== action.blog.id).concat(action.blog)
    return sortBlogs(updatedBlogs)
  }
  case 'DELETE': {
    return sortBlogs(state.filter(b => b.id !== action.blog.id))
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
    console.log('dispatch')
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

//uses PUT to update the likes, ideally would want blogid/likes POST in the backend
export const likeBlog = (blog) => {
  return async dispatch => {

    const blogWithLike = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }

    const updatedBlog = await blogService.update(blogWithLike)

    dispatch({
      type: 'LIKE',
      blog: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE',
      blog
    })
  }
}

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}


export default reducer