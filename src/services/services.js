import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToke => {
	token = `Bearer ${newToke}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getUser = async (userCred) => {
	const user = await axios.post('api/login', userCred )
	return user.data
}

const createBlog = async (blog) => {
	const config = {
		headers: { 'Authorization': token }
	}
	const newBlog = await axios.post('api/blogs', blog, config)
	return newBlog.data
}

const updateBlog = async (blog) => {
	const config = {
		headers: { 'Authorization': token }
	}
	const updatedBlog = await axios.put(`api/blogs/${blog.id}`, blog, config)
	return updatedBlog.data
}

const showMessage = (func, message, timeOut) => {
	func(message)
	setTimeout(() => {func('')}, timeOut)
}

const deleteBlog = async (blog) => {
	const config = {
		headers: { 'Authorization': token }
	}
	const updatedBlog = await axios.delete(`api/blogs/${blog.id}`, config)
	return updatedBlog.data
}

export default  { getAll, getUser, createBlog, showMessage, setToken, updateBlog, deleteBlog }