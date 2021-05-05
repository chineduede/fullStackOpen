import anecService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
		case 'VOTE':
			const anecdoteFind = state.find(anec => anec.id === action.data.id)
			const likedAnecdote = {
				...anecdoteFind,
				votes: anecdoteFind.votes + 1
			}
			return state.map(anec => 
				anec.id === action.data.id ? likedAnecdote : anec)
		case 'NEW_ANECDOTE':
			return state.concat(action.data)
		case 'INIT_ANECDOTE':
			return action.data
		default:
			return state
	}
}

export const voteAnecdote = (anecdote) => {
	return  async dispatch => {
		const updated = await anecService.updateVotes(anecdote)
		dispatch({
			type: 'VOTE',
			data: updated
		})
	}
}


export const createAnecdote = content => {
	return async dispatch => {
		const newAnec = await anecService.newAnec(content)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: newAnec
		})
	}
}

export const initializeAnecdote = () => {
	return async dispatch => {
		const anecdotes =  await anecService.getAll()
		dispatch({
			type: 'INIT_ANECDOTE',
			data: anecdotes,
		})
	}
}

export default anecdoteReducer