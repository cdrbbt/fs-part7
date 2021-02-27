import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import BlogCreationFrom from './BlogCreationForm'

test('Blog creation function should recieve all the data', () => {
  const [title, author, url] = ['Testing form', 'Me', 'localhost']

  const createBlog = jest.fn()

  const component = render(
    <BlogCreationFrom createBlog={createBlog}/>
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: title }
  })

  fireEvent.change(authorInput, {
    target: { value: author }
  })

  fireEvent.change(urlInput, {
    target: { value: url }
  })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  console.log()
  expect(createBlog.mock.calls[0][0].title).toBe(title)
  expect(createBlog.mock.calls[0][0].author).toBe(author)
  expect(createBlog.mock.calls[0][0].url).toBe(url)
})