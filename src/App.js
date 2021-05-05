import React, { useState, useEffect, useRef } from 'react'
import { Notification, ErrorMsg } from './components/components'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Blog from './components/Blog'
import blogService from './services/services'
import Toggleable from './components/toggle'


const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [notif, setNotif] = useState('')

	const newBlogRef = useRef()

	useEffect(() => {
		blogService
			.getAll()
			.then(blogs => setBlogs( blogs ))
	}, [])



	const loginHook = (userCred) => {
		blogService
			.getUser(userCred)
			.then(userData => {
				setUser(userData)
				window.localStorage.setItem('blogApp', JSON.stringify(userData))
				blogService.setToken(userData.token)
				blogService.showMessage(setNotif, `Welcome back ${userData.username}`, 4000)
			})
			.catch(() => {
				blogService.showMessage(setErrorMessage, 'Wrong credentials', 4000)
			})
	}

	const updateLikes = (blogObj) => {
		blogService
			.updateBlog(blogObj)
			.then(updatedBlog => {
				setBlogs(blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog))
			})
			.catch(error => console.log(error))
	}

	const deleteBlog = (blogObj) => {
		blogService
			.deleteBlog(blogObj)
			.then(() => {
				setBlogs(blogs.filter(blog => blog.id !== blogObj.id))
			})
			.catch(error => {
				console.log(error)
				blogService.showMessage(setNotif, `${blogObj} has been deleted`, 4000)
			})
	}

	useEffect(() => {
		const details = window.localStorage.getItem('blogApp')
		if (details) {
			const user = JSON.parse(details)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogForm = () => (
		<Toggleable buttonLabel="new blog" ref={newBlogRef}>
			<NewBlog createNewBlog={createBlog} />
		</Toggleable>
	)

	const logInForm = () => (
		<Login loginUser={loginHook} />
	)

	const createBlog = (blogObj) => {
		newBlogRef.current.toggleVisibility()
		blogService
			.createBlog(blogObj, user.token)
			.then(newBlog => {
				setBlogs(blogs.concat(newBlog))
				blogService.showMessage(setNotif, `New Blog by ${newBlog.author} added! `, 4000)
			})
			.catch(() =>  {
				blogService.showMessage(setErrorMessage, 'You are not authorized to create a note', 4000)
			})
	}

	const logOut = () => {
		window.localStorage.removeItem('blogApp')
		setUser(null)
	}


	return (
		<div>
			{ notif ? <Notification message={notif} /> : (errorMessage) ? <ErrorMsg message={errorMessage} /> : ''}
			{user === null
				? logInForm()
				:	<div>
					<h2>blogs</h2>
					<p>{user.username} logged in  <button type="button" onClick={logOut}>logout</button></p>
					{blogForm()}
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map(blog =>
							<Blog
								key={blog.id}
								blog={blog}
								updateLikes={updateLikes}
								username={user.username}
								deleteBlog={deleteBlog}
							/>
						)}
				</div>
			}
		</div>
	)
}

export default App