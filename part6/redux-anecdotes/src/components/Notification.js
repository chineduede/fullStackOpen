import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)

	const notifBlock = () => (
		<div style={style}>
			{notification}
		</div>
	)

  const style = {
    border: 'solid',
    padding: 7,
    borderWidth: 1,
		margin: 5
  }
  return (
		<div>
		{notification
			? notifBlock()
			: <></>
		}
		</div>
  )
}

export default Notification