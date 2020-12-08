import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { createStore, applyMiddleware, combineReducers } from '../MyRedux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise'
// import isPromise from 'is-promise'
export const countReducer = (state=0, {type, payload=1}) => {
  switch (type) {
    case 'ADD':
      return state + payload;
    case 'MINUS':
      return state - payload;
    default:
      console.log('in--', state)
      return state
  }
}

const store = createStore(
  combineReducers({home: countReducer}),
  applyMiddleware(promise, thunk, logger)
)

// logger实现
// function logger ({ getState }) {
//   return next => action => {
//     console.log('loger---in')
//     // logger本质是一个加强了的dispatch，被赋予了getState/dispatch方法
//     // next就是新的dispatch, dispatch(action)后返回新的action
//     // 旧值通过getState获取
//     // 当执行next(action)后，得到新值，重新调用getState便可拿到
//     console.log('---------')
//     console.log('--开始执行', action.type)
//     const preState = getState()
//     console.log('--preState', preState)
//     const returnValue = next(action)
//     const nextState = getState()
//     console.log('--nextState', nextState, returnValue)
//     return returnValue
//   }
// }

// // thunk 实现
// // 判断dispatch传入的action是否为函数，如果是函数则执行，并把dispatch, getState传入
// // 否则为对象，则可直接执行dispatch（action）

// function thunk ({ dispatch, getState }) {
//   return next => action => {
//     console.log('thunk---in')
//     if (typeof action === 'function') { 
//       // 第一次遇到action函数而非对象，则直接会先执行该函数，并把dispatch, getState传过去
//       // 使用者执行函数后，通过执行dispatch
//       return action(dispatch, getState)
//     } else { // 第二次重新回到这里（优先走中间件），再执行dispatch传入对象
//       return next(action) // 执行下一个中间件
//     }
//   }
// }

// // promise 实现
// function promise ({dispatch}) {
//   return next => action => {
//     console.log('promise---in')
//     return isPromise(action) ? action.then(dispatch) : next(action)
//   }
// }

export default store