
import React, { useContext, useReducer, useLayoutEffect } from 'react'
import { bindActionCreators } from './bindActionCreators'
// 实现react-redux
// 全局reduxContext
const RecuxContext = React.createContext()
// provider
export function Provider ({ store, children }) {
  return <RecuxContext.Provider value={store}>{ children }</RecuxContext.Provider>
}
// connect: 高阶组件,返回一个新的组件
export function connect (mapStateToProps=state => state, mapDispatchToProps) {
  return WrapComponent => props => {
    // 获取store
    const store = useContext(RecuxContext)
    const [,forceUpdate] = useReducer(x => x+1, 0)
    const { getState, dispatch, subscribe } = store
    let stateProps = {}
    let dispatchProps = {}
    // mapStateToProps形式为 ({count}) => ({count}),将getState()执行后得到state,执行mapStateToProps(state)便可得到({count}),再传给mapState作为props
    stateProps = mapStateToProps(getState())
    dispatchProps = { dispatch }
    // 区分mapDispatchToProps两种类型: function, object
    if (typeof mapDispatchToProps === 'function') {
      dispatchProps = mapDispatchToProps(dispatch)
    } else if (typeof mapDispatchToProps === 'object') {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }
    
    // 使用useLayoutEffect来进行订阅，是因为useEffect是延迟执行，有可能延迟订阅导致丢失
    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate()
      })
      return () => {
        unsubscribe && unsubscribe()
      }
    }, [store, subscribe])
    return <WrapComponent {...stateProps} {...dispatchProps} {...props}/>
  }
}


// useSelector
function useStore () {
  const store = useContext(RecuxContext)
  return store
}
export function useSelector (selector) {
  const store = useStore()
  const [, forceUpdate] = useReducer(x => x+1, 0)
  const { getState, subscribe } = store
  const state = selector(getState())
  useLayoutEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate()
    })
    return () => {
      unsubscribe()
    }
  }, [store, subscribe])
  return state
}

// useDispatch
export function useDispatch() {
  const store = useStore()
  return store.dispatch
}