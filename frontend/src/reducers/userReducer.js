import loginService from '../services/login'
import blogService from '../services/blogs'
import { changeNotification } from './notificationReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type){
  case 'LOGIN': {
    return action.user
  }
  case 'LOGOUT':{
    return initialState
  }
  case 'LOCAL': {
    return action.user
  }
  default: return state
  }
}

export const logIn = ({ username, password }) => {
  return async dispatch => {
    try {

      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)

      // not sure about this
      dispatch(changeNotification(`${loggedInUser.name} logged in`))
      dispatch({
        type: 'LOGIN',
        user: loggedInUser
      })
    } catch (e) {
      dispatch(changeNotification(`Login error ${e.message}`))
    }
  }
}

export const logout = () => {
  return dispach => {
    window.localStorage.removeItem('user')
    dispach({
      type: 'LOGOUT'
    })
  }
}


export const checkLocal = () => {
  return dispatch => {
    const localUser = window.localStorage.getItem('user')
    let user = null

    if (localUser) {
      user = JSON.parse(localUser)
      blogService.setToken(user.token)
    }

    console.log(user)
    dispatch({
      type: 'LOCAL',
      user
    })
  }
}

export default reducer