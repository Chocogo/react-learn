
export default function createStore(reducer) {
  let currentState = null
  let currentListeners = []
  const getState = () => {
    return currentState
  }
  const dispatch = (action) => { // 利用定义好的reducer函数执行，得到state,并且触发更新
    currentState = reducer(currentState, action)
    currentListeners.forEach(listener => listener())
  }
  const subscribe = (listener) => { // 订阅监听
    currentListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}
