import axios from 'axios'

const baseUrl = 'http://localhost:8000/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const newAnec = async (content) => {
	const anec = { content, votes: 0 }
	const response = await axios.post(baseUrl, anec)
	return response.data
}

const updateVotes = async (anecdote) => {
	const anec = {...anecdote, votes: anecdote.votes + 1}
	const updatedAnecdote = await axios.put(`${baseUrl}/${anecdote.id}`, anec)
	return updatedAnecdote.data
}


export default {
	getAll, 
	newAnec,
	updateVotes
}