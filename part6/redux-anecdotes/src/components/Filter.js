import { useDispatch } from 'react-redux'
import React from 'react'
import { filterAnec } from '../reducers/filterReducer'

const Filter = () => {
	const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={({ target }) => dispatch(filterAnec(target.value))} />
    </div>
  )
}

export default Filter