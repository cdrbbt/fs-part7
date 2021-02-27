const _ = require('lodash')
const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes < item.likes
      ? item
      : favorite
  }
  
  return blogs.length > 0 ? blogs.reduce(reducer, { likes:-1 }) : null
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const blogData = _.countBy(blogs, blog => blog.author)
  const formatObject = (value, key) => ({author: key, blogs: value})
  const fomattedBlogData = _.map(blogData, formatObject)
  return _.maxBy(fomattedBlogData, data => data.blogs)
}

const mostLikes = (blogs) => {

  if (blogs.length === 0) return null

  const groupedBlogs = _.groupBy(blogs, blog => blog.author)
  logger.info('grouped ', groupedBlogs)


  const mapper = (blogList, key) => {
    const red = (res, val) => {
      return res + val.likes
    }
    const likes = _.reduce(blogList, red, 0)
    return {author: key, likes}
  } 

  const authorLikes = _.map(groupedBlogs, mapper)
  logger.info('likes per author', authorLikes)

  return _.maxBy(authorLikes, data => data.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}