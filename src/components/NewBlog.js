import React, { useState } from 'react'


const NewBlog = ({ createNewBlog }) => {

	const [author, setAuthor] = useState('')
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')

	const createBlog = (e) => {
		e.preventDefault()
		createNewBlog({
			author: author,
			title: title,
			url: url
		})
		setTitle('')
		setUrl('')
		setAuthor('')
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createBlog}>
				<div>
					title: <input id="title" type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
				</div>
				<div>
					author <input id="author" type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
				</div>
				<div>
					url: <input id="url" type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
				</div>
				<button id="newBlog" type="submit">create</button>
			</form>
		</div>
	)
}

export default NewBlog