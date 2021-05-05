import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

const AnecdoteForm = (props) => {

	const newAnecdoteFunc = async (e) => {
		e.preventDefault()
		const anec = e.target.anecdote.value
		e.target.anecdote.value = ''
		props.createAnecdote(anec)
		props.setNotification(`new anecdote '${anec.slice(1, 50)}...' created`, 5000)
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={newAnecdoteFunc}>
				<div><input name="anecdote"/></div>
				<button type="submit">create</button>
			</form>
		</>
	)
}


export default connect(
	null, { 
		setNotification,
		createAnecdote }
)(AnecdoteForm)