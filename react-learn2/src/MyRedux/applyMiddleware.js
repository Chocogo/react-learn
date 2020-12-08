
function compose (...fns) {
  // 边界
  if (fns.length === 0) {
    return arg => arg
  }
  if (fns.length === 1) {
    return fns[0]
  }
  return fns.reduce((a, b) => { 
    return (...args) => {
      return a(b(...args))
    }
  })
}

export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer) // 依然要返回store, 和加强后的dispatch
    let {dispatch, getState} = store
    // TODO 加强dispatch
    // console.log((action, ...args) => dispatch(action, ...args))
    const middleApi = {
      getState,
      // dispatch
      dispatch: (...args) => dispatch(...args) 
      // dispatch为什么需要 (action, ...args)=> dispatch(action, ...args) ,而不能直接dispatch: dispatch??
      // 原因：1、如果外层使用者直接store.dispatch执行，会直接去到createStore，从而跳过中间件流程，这样的话会忽略之后所有中间件流程（先thunk,后logger时，logger会被直接跳过）
      // 2、如果使用 (...args) => dispatch(...args)函数体包裹，使用者使用dispatch后，会回来当前作用域middleApi作用域，继续走中间件流程
      // （可通过断电调试追踪顺序）
    }
    // console.log(middleApi,'--middleApi')
    /***!!! */
    // 通过传入的中间件（高阶函数，返回函数），每项传入getState和dispatch，得出中间件链
    const middleChain = middlewares.map(middle => middle(middleApi))
    // 聚合所有中间件，从头传入dispatch到内，最终得到加强的dispatch
    dispatch = compose(...middleChain)(dispatch)
    /***!!! */
    return {
      ...store,
      dispatch
    }
  }
}
