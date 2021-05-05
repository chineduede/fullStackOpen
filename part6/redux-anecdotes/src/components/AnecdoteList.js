import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'



const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<>
			<div>{anecdote.content}</div>
			<div>has {anecdote.votes} <button onClick={handleClick}>vote</button></div>
		</>
	)
}

const AnecdoteList = (props) => {

	const updateVotes = (anecdote) => {
		props.voteAnecdote(anecdote)
		props.setNotification(`you voted '${anecdote.content.slice(0, 30)}...'`, 5000)
	}

	return (
		<div>
		{props.anecdotes
			.sort((a, b) => b.votes - a.votes)
			.map(anecdote => 
				<Anecdote 
					key={anecdote.id}
					anecdote={anecdote}
					handleClick={() => updateVotes(anecdote)}
				/>)
		}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes.filter(anecdote =>
			anecdote.content.includes(state.filter)
		)
	}
}

const mapDispatchToProps = {
	voteAnecdote,
	setNotification
}

const connectedAnecdote = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default connectedAnecdote