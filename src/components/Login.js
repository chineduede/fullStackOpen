import React, { useState } from 'react'

const Login = ({ loginUser }) => {

	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	const loginHook = (e) => {
		e.preventDefault()
		loginUser({
			username: username,
			password: password
		})
		setPassword('')
		setUsername('')
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={loginHook}>
				<div>
					username <input id="username" type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)} autoComplete="on" /><br/>
					password <input id="password" type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} autoComplete="off"/>
				</div>
				<button id="loginButton" type="submit">login</button>
			</form>
		</div>
	)
}

export default Login