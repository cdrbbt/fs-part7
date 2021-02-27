import React from 'react'

const Notification = ({ message }) => {
  if (message === null) return null
  return (
    <h3>{message}</h3>
  )
}

export default Notification