
const filterReducer = (state = '', action) => {
	switch(action.type) {
		case 'FILTER':
			return action.str
		default:
			return state
	}
}

export const filterAnec = (str) => {
	return {
		type: 'FILTER',
		str
	}
}

export default filterReducer