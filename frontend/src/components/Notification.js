import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)

  if (notification === '') return null
  return (
    <h3>{notification}</h3>
  )
}

export default Notification