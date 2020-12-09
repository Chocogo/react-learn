import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './mySaga'


const initialState = {
  isLogin: false,
  userName: ''
}

const loginReducer = (state=initialState, action) => {
  const { type } = action
  switch (type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...{
          isLogin: true,
          userName: 'xiaoming'
        }
      }
    default:
      return initialState
  }
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ user: loginReducer }),
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(mySaga)

export default store