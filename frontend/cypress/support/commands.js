Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res.body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('postBlog', (blog) => {
  const user =JSON.parse(localStorage.getItem('user'))
  const req = {
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    auth: {
      bearer: user.token
    }
  }
  return cy.request(req)
})


Cypress.Commands.add('likeBlog', (blog) => {
  return cy.request('PUT',`http://localhost:3003/api/blogs/${blog.id}`, { ...blog, likes: blog.likes })
})