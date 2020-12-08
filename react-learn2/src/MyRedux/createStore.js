
export default function createStore(reducer, enhancer) {
  // enhancer === applyMiddleware()执行后的结果
  if (enhancer) {
    return enhancer(createStore)(reducer) // 为了加强dispatch, dispatch来自createStore
  }

  let currentState
  let currentListeners = []
  const getState = () => {
    return currentState
  }
  const dispatch = (action) => { // 利用定义好的reducer函数执行，得到state,并且触发更新
    currentState = reducer(currentState, action)
    currentListeners.forEach(listener => listener())
    return action
  }
  const subscribe = (listener) => { // 订阅监听
    currentListeners.push(listener)
    // 取消订阅
    return () => {
      // const index = currentListeners.indexOf(listener)
      // currentListeners.splice(index, 1)
      // 或者过滤
      currentListeners = currentListeners.filter(item => item !== listener)
    }
  }
  dispatch({ type: '__INITIAL' }) // 手动触发初始值

  return {
    getState,
    dispatch,
    subscribe
  }
}
