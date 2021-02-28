import { Button } from '@material-ui/core'
import React, { useState, useImperativeHandle } from 'react'

//eslint doesnt handle forwardRef
// eslint-disable-next-line react/display-name
const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const buttonProps = {
    size: 'small',
    variant: 'contained'
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} {...buttonProps} color='primary'>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} {...buttonProps} color='secondary'>cancel</Button>
      </div>
    </div>
  )
})

export default Toggleable