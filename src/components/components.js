import React from 'react'

const Notification = ({ message }) => {

	return (
		<div className="success">
			{message}
		</div>
	)
}

const ErrorMsg = ({ message }) => {

	return (
		<div className="error">
			{message}
		</div>
	)
}



export { Notification, ErrorMsg }