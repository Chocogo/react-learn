import { TEXT } from "./const"

// 实现ReactDOM.remder
function render (vnode, container) {
  // vnode-> node, 插入到页面中
  const node = createNode(vnode) // +3 -2
  container.appendChild(node) //   -3
}
// 实现vnode-> node
function createNode(vnode) {
  // type: TEXT(文本) / typeof 'string' （标签）
  const { type, props } = vnode
  let node = null
  if (type === TEXT) {
    node = document.createTextNode('') // 创建文本 // +4
  } else if (typeof type === 'string') {
    node = document.createElement(type) // +0
  } else if (typeof type === 'function') {
    node = type.isReactComponent ? updateClassComponent(vnode) : updateFunctionNode(vnode)
  } else {
    node = document.createDocumentFragment()
  }
  // 递归子节点
  reconcileChildren(props.children, node) // +1 -5
  // 更新节点属性: 先文本，后标签
  updateNode(node, props)
  return node // -1  -6
}
// 递归子节点
function reconcileChildren(children, node) {
  children.forEach(child => {
    // 兼容数组的情况
    if (Array.isArray(child)) {
      child.forEach(singleChild => {
        render(singleChild, node)
      })
    } else {
      render(child, node) // +2 -4
    }
  })
  // return node
}
// 更新节点属性: props内的href, className, 等给element, nodeValue 给textNode
function updateNode(node, nextProps) {
  Object.keys(nextProps).filter(key => key !== 'children')
    .forEach(key => {
      if (key.slice(0, 2) === 'on') { // 这里做了简化，源码中使用合成事件
        const eventName = key.slice(2).toLocaleLowerCase()
        node.addEventListener(eventName, nextProps[key]())
      } else {
        node[key] = nextProps[key]
      }
    })
}
// 更新函数节点: 需要知道挂载的节点，所以需要parentNode
function updateFunctionNode(vnode) {
  const { type, props } = vnode
  const vvnode = type(props)
  return createNode(vvnode)
}
// 更新类节点
function updateClassComponent (vnode) {
  const { type, props } = vnode
  const instance = new type(props) 
  const vvnode = instance.render()
  return createNode(vvnode)
}


export default {
  render
}

/**
 * 渲染类型
 * 1、文本节点
 * 2、标签节点
 * 3、function组件
 * 4、class类组件
 * 5、fragment组件<></>
 * 6、数组渲染
 */
