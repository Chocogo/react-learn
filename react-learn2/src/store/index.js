import { createStore } from 'redux'

export const countReducer = (state=0, {type, payload=1}) => {
  switch (type) {
    case 'ADD':
      return state + payload
    case 'MINUS':
      return state - payload
    default:
      return state
  }
}

const store = createStore(countReducer)

export default store