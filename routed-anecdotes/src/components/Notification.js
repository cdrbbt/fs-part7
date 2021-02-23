import React from 'react'

const Notification = ({ text }) => {
  if (text === '') return null
  return(
    <div>{text}</div>
  )
}


export default Notification