




// bindActionCreators
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}
// 主要是实现用dispatch包裹每一个对象函数{add: () => ({ type: 'ADD' })}
export function bindActionCreators(creators, dispatch) {
  let obj = {}
  for(let key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch)
  }
  return obj
}
