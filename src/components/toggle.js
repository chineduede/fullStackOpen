import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = React.forwardRef((props, ref) => {

	const [visible, setVisible] = useState(false)

	const hiddenWhenVisble =  { display : visible ? 'none' : '' }
	const showWhenVisble =  { display : visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	Toggleable.propTypes = {
		buttonLabel: PropTypes.string.isRequired
	}

	return (
		<>
			<div style={hiddenWhenVisble} className="toggable-div">
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisble}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</>
	)
})

Toggleable.displayName = 'Toggleable'

export default Toggleable