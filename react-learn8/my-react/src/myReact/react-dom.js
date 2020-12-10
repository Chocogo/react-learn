import { PLACEMENT, TEXT } from "./const"

// 下个任务单元（fiber）
let nextUnitWork = null
// 根fiber(work in progress root)
let wipRoot = null
// 当前个根节点
let currentRoot = null

// 实现ReactDOM.remder
function render (vnode, container) {
  // vnode-> node, 插入到页面中
  // const node = createNode(vnode) // +3 -2
  // container.appendChild(node) //   -3
  // 根fiber
  wipRoot = {
    node: container, // 当前真实dom节点
    props: {
      children: [vnode] // 存属性
    },
    base: currentRoot, // diff比较时，需要比较两次，base要保存上一次的值
    effectTag: PLACEMENT
  }
  // 定义下一个工作单元
  nextUnitWork = wipRoot
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
  // reconcileChildren(props.children, node) // +1 -5
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
// // 更新函数节点: 需要知道挂载的节点，所以需要parentNode
// function updateFunctionNode(vnode) {
//   const { type, props } = vnode
//   const vvnode = type(props)
//   return createNode(vvnode)
// }
// // 更新类节点
// function updateClassComponent (vnode) {
//   const { type, props } = vnode
//   const instance = new type(props) 
//   const vvnode = instance.render()
//   return createNode(vvnode)
// }

/********实现fiber************/


let preSibling = null
// 结果： 遍历children(vnode array)， 构建以workInProgressFiber为首的链表结构
function reconcileChildren_Fiber (workInProgressFiber, children) {
  children.forEach((child, index) => {
    let newFiber = {
      node: null,
      base: null, // 初次
      props: child.props,
      type: child.type,
      return: workInProgressFiber, // 父
      effectTag: PLACEMENT
    }
    // 第一个child为父的child, 保存当前fiber,下次（非第一次）的sibling构建newFiber
    if (index === 0) { // 0
      workInProgressFiber.child = newFiber
    } else { // 2
      preSibling.sibling = newFiber
    }
    preSibling = newFiber // 1
  })
}

function updateHostComponent(fiber) {
  // todo fiber 结构-->render()中定义根fiber和nextUnitWork
  // 1、生成node节点: vnode->node
  if(!fiber.node) {
    fiber.node = createNode(fiber)
  }
  // 2、协调子元素, 构建子元素fiber架构
  const { children } = fiber.props
  reconcileChildren_Fiber(fiber, children)
}

// 更新函数节点: 取出vnode(jsx), 传给reconcileChildren_Fiber
function updateFunctionNode(fiber) {
  const { type, props } = fiber
  const children = [type(props)]
  reconcileChildren_Fiber(fiber, children)
}

// 更新类节点
function updateClassComponent (fiber) {
  const { type, props } = fiber
  const instance = new type(props) 
  const children = [ instance.render() ]
  return reconcileChildren_Fiber(fiber, children)
}

function performUnitWork(fiber) {
  // 1. 执行当前任务
  const { type } = fiber
  if (typeof type === 'function') {
    // 函数，修改updateComponent
    type.isReactComponent 
      ? updateClassComponent(fiber)
      : updateFunctionNode(fiber)
  } else {
    // h5标签
    updateHostComponent(fiber)
  }
  // 2. 返回下一个任务： child > sibling > return -> sibling 
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    // 最右一个元素没有sibling, 重新递归返回父元素，走父元素的sibling判断
    nextFiber = nextFiber.return
  }
}

/****commitRoot*****/ 
// 从根节点开始提交
function commitRoot() {
  commitWorker(wipRoot.child)
  // 保留上一次的fiber
  currentRoot = wipRoot
  // console.log(parentNodeFiber)
  // 提交后就不用根fiber了
  wipRoot = null
}
// 从根fiber执行提交: 寻找最近的父节点(有可能是Fragment,是没有node的)，通过effectTag去执行对应操作
// 递归遍历子元素，兄弟元素，执行提交
function commitWorker(fiber) {
  if (!fiber) {
    return 
  }
  // console.log(fiber)
  // 找父
  let parentNodeFiber = fiber.return
  while(!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return
  }
  let parentNode = parentNodeFiber.node
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    parentNode.appendChild(fiber.node)
  }
  // todo 删除，更新
  commitWorker(fiber.child)
  commitWorker(fiber.sibling)
}
/*********/ 

// 工作单元
function workLoop(deadline) {
  // 有时间和有任务单元
  if(deadline.timeRemaining() > 1 && nextUnitWork) {
    nextUnitWork = performUnitWork(nextUnitWork)
  }
  // 没有任务，还未提交
  if (!nextUnitWork && wipRoot) {
    // 进行commit提交: 从根fiber开始提交
    commitRoot()
  }
  // 递归
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)


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
