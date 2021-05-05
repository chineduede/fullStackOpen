import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, username, deleteBlog }) => {

	const [details, setDetails] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const pStyle = {
		padding: 0,
		margin: 0
	}

	const toggleDetails = () => {
		setDetails(!details)
	}

	const updateBlog = () => {
		const blogUpdate = {
			id: blog.id,
			likes: blog.likes + 1
		}
		updateLikes(blogUpdate)
	}

	const deleteBlg = () => {
		const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
		if (confirm) {
			const blogObj = {
				id: blog.id
			}
			deleteBlog(blogObj)
		}
	}

	return (
		<div style={blogStyle}>
			{details
				? <div className="blogDetails">
					{blog.title} {blog.author}
					<button onClick={toggleDetails}>{details ? 'hide' : 'view'}</button>
					<p style={pStyle}>{blog.url}</p>
					<p id="likesPara" style={pStyle}>likes {blog.likes} <button onClick={updateBlog} className="likeButton">like</button></p>
					{ username === blog.author
						? <p style={pStyle}><button id="delBlog" onClick={deleteBlg}>delete</button></p>
						: <></>}
				</div>
				: <div className="blogOrdinary">
					{blog.title} {blog.author}
					<button onClick={toggleDetails}>{details ? 'hide' : 'view'}</button>
				</div>}
		</div>
	)
}

export default Blog