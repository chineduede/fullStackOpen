import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
const mockHandler = jest.fn()

beforeEach(() => {
	const blog = {
		title: 'My name is khan',
		author: 'Khan Academy',
		likes: 10,
		url: 'www.khanacademy.com'
	}

	component = render(
		<Blog blog={blog} updateLikes={mockHandler} />
	)
})

test('renders only author and title of blog', () => {

	const div = component.container.querySelector('.blogOrdinary')
	expect(div).toHaveTextContent('My name is khan Khan Academy')
})

test('renders blog details when the view button is pressed', () => {
	const button = component.container.querySelector('button')
	fireEvent.click(button)

	const details = component.container.querySelector('.blogDetails')
	expect(details).toHaveTextContent('www.khanacademy.comlikes 10')
})

test('clicking the like button twice has effect twice', () => {
	const button = component.container.querySelector('button')
	fireEvent.click(button)
	const likeButton = component.container.querySelector('.likeButton')
	fireEvent.click(likeButton)
	fireEvent.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)

})