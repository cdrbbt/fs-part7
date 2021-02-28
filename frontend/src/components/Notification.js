import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(store => store.notification)

  if (notification === '') return null
  return (
    <Alert>{notification}</Alert>
  )
}

export default Notification