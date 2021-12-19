import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SingleBlog from './SingleBlog'

test('render right content', () => {
  const blog = {
    title: 'test blog',
    author: 'jester',
    url: '123',
    likes: 0,
  }

  const component = render(<SingleBlog blog={blog} />)

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('jester')
  expect(component.container).not.toHaveTextContent('123')
  expect(component.container).not.toHaveTextContent(0)
})

test('expect to show everyhing after button clicked', () => {
  const blog = {
    title: 'test blog',
    author: 'jester',
    url: '123',
    likes: 0,
  }
  const component = render(<SingleBlog blog={blog} />)
  const button = component.getByText('show more')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('123')
  expect(component.container).toHaveTextContent('likes: 0')
})

test('If like button is pressed twice', async () => {
  const blog = {
    title: 'test blog',
    author: 'jester',
    url: '123',
    likes: 0,
  }
  const mockLike = jest.fn()
  const component = render(<SingleBlog blog={blog} addLike={mockLike} />)
  const button = component.getByText('show more')
  await fireEvent.click(button)

  const likeBtn = component.getByText('like')
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)
  expect(mockLike.mock.calls).toHaveLength(2)
})
