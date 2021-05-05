import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from './NewBlog'

test('form calls event handler with the right details receeived as props', () => {

	const createBlog = jest.fn()

	const component = render(
		<NewBlog createNewBlog={createBlog} />
	)

	const form = component.container.querySelector('form')
	const titleInput = component.container.querySelector('#title')
	const authorInput = component.container.querySelector('#author')
	const urlInput = component.container.querySelector('#url')

	fireEvent.change(titleInput, {
		target: { value: 'My name is khan' }
	})

	fireEvent.change(authorInput, {
		target: { value: 'khan Academy' }
	})

	fireEvent.change(urlInput, {
		target: { value: 'www.khanacademy.com' }
	})

	fireEvent.submit(form)
	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('My name is khan')
	expect(createBlog.mock.calls[0][0].author).toBe('khan Academy')
	expect(createBlog.mock.calls[0][0].url).toBe('www.khanacademy.com')

})

