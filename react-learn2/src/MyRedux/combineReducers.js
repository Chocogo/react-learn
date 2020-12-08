
export default function combineReducers(reducers) { // {home: reducer}
  return function combinations(state={}, action) { // 返回reducer
    let nextState = {}
    let hasChanged = false

    for(let key in reducers) {
      const reduce = reducers[key]
      nextState[key] = reduce(state[key], action) // 执行所有reducer返回新nextState
      hasChanged = hasChanged || nextState[key] !== state[key] // 有不同则说明改变
    }
    // 考虑新reducers的key较少情况下，前面都完成对比，仍然需要比较key长度
    hasChanged = hasChanged || Object.keys(state).length !== Object.keys(nextState).length
    // 根据是否变化返回新旧state
    return hasChanged ? nextState : state
  }
}
