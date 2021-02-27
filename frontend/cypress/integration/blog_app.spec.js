/// <reference types="Cypress" />

describe('Note app', function() {

  const user = {
    name: 'Sam Jackson',
    username: 'sjack',
    password: 'ladle'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('login form is shown', function() {
    cy.get('#loginform')
  })

  describe('login', function() {

    it('user can log in', function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginbutton').click()
      cy.contains(`Welcome ${user.name}`)
    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type(user.username.concat('typo'))
      cy.get('#password').type(user.password)
      cy.get('#loginbutton').click()
      cy.contains('invalid username or password')
    })
  })

  describe('when logged in', function () {
    beforeEach(function() {
      cy.login(user.username, user.password)
    })

    it('can create a blog', function() {
      const blog = {
        title: 'cypress test',
        url: 'localhost',
        author: 'me'
      }

      cy.contains('new note').click()
      cy.get('#author').type(blog.author)
      cy.get('#title').type(blog.title)
      cy.get('#url').type(blog.url)

      cy.get('#sendblog').click()
      cy.contains(`Blog ${blog.title} by ${blog.author} created`)

      cy.get('#blogs').contains(blog.title)
    })


    //could use more polish, not exactly correct with multiple blogs
    describe('when a blog exists', function() {
      const blog = {
        title: 'cypress ex',
        url: 'localhost',
        author: 'me'
      }
      beforeEach(function(){
        console.log(blog)
        cy.postBlog(blog)
        cy.postBlog({ ...blog, title:'blog2' })
        cy.postBlog({ ...blog, title:'blog4' })
      })

      it('the blog can be liked', function() {
        cy.visit('http://localhost:3000')
        cy.contains('details').click()
        cy.contains('Like').click()
        cy.contains('likes: 1')
      })

      it('the blog can be deleted', function() {
        cy.visit('http://localhost:3000')
        cy.contains('details').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', blog.title)
      })
    })

    //hacked together not very well, would need to research jquery more
    it.only('blogs are properly sorted', function() {
      const blog = {
        title: '0 likes',
        url: 'localhost',
        author: 'me'
      }
      cy.postBlog(blog)
      cy.postBlog({ ...blog, title: '3 likes' })
        .then( res => {
          return cy.likeBlog({ ...res.body, likes: 3 })
        })
      cy.postBlog({ ...blog, title: '5 likes' })
        .then( res => {
          return cy.likeBlog({ ...res.body, likes: 5 })
        })
        
      cy.visit('http://localhost:3000')
      cy.get('.visibilityToggle').click({ multiple: true })
      cy.get('.likes')
        .then(likes => {
          cy.get(likes[0]).contains(5)
          cy.get(likes[1]).contains(3)
          cy.get(likes[2]).contains(0)
        })
    })
  })
})