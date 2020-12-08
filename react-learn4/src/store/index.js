import { createStore, combineReducers } from 'redux'

const initialLoginState = {
  isLogin: false,
  userName: ''
}

const LoginReducer = (state=initialLoginState, action={type: ''}) => {
  const { type } = action
  switch (type) {
    case 'LOGIN_SUCCESS':
      return state = {
        ...initialLoginState,
        ...{isLogin: true, userName: 'xiaomin'}
      }
    default:
      return initialLoginState
  }
}

export default createStore(combineReducers({ user: LoginReducer }))