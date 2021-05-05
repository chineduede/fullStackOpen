
const notifReducer = (state = '', action) => {
	switch(action.type) {
		case 'SET_MESSAGE':
			return action.message
		case 'REMOVE_MESSAGE':
			return ''
		default:
			return state
	}
}

let timeoutID

export const setNotification = (message, time) => {
	return  dispatch => {
		clearTimeout(timeoutID)
		dispatch({ type: 'SET_MESSAGE', message })
		timeoutID = setTimeout(() => dispatch({type: 'REMOVE_MESSAGE'}), time)
	}
}

export default notifReducer