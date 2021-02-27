const listHelper = require('../utils/list_helper')

const emptyList = []
const oneItemList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const longList = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of an empty list is 0', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('when the list has only one entry to be the likes of the entry', () => {
    expect(listHelper.totalLikes(oneItemList)).toBe(5)
  })

  test('of a long list to be correct', () => {
    expect(listHelper.totalLikes(longList)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of a list with a single entry is the entry itself', () => {
    expect(listHelper.favoriteBlog(oneItemList)).toEqual(oneItemList[0])
  })

  test('of a list to be the blog with the most likes', () => {
    expect(listHelper.favoriteBlog(longList)).toEqual({ _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 })
  })

  test('of an emty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })
})

describe('author with the most blogs', () => {
  test('of a list with one author is that author', () => {
    expect(listHelper.mostBlogs(oneItemList)).toEqual({author: 'Edsger W. Dijkstra', blogs: 1})
  })

  test('of a list with many blogs is the one of the authors who has the most blogs',  () => {
    expect(listHelper.mostBlogs(longList)).toEqual({author: 'Robert C. Martin', blogs: 3})
  })

  test('of an empty list to be null', () => {
    expect(listHelper.mostBlogs(emptyList)).toBe(null)
  })
})

describe('author with the most likes', () => {
  test('of an empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('of a list with one blog to be the author of the blog', () => {
    expect(listHelper.mostLikes(oneItemList)).toEqual({author: 'Edsger W. Dijkstra', likes: 5})
  })

  test('of a long list to be the one with the largest sum of likes', () => {
    expect(listHelper.mostLikes(longList)).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
  })
})