import { PLACEMENT, TEXT, UPDATE, DELETE } from "./const"

// 下个任务单元（fiber）
let nextUnitWork = null
// 根fiber(work in progress root)
let wipRoot = null
// 当前个根节点
let currentRoot = null
// 收集删除
let deletions = null


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
  deletions = []
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
  updateNode(node, {}, props)
  return node // -1  -6
}
// // 递归子节点
// function reconcileChildren(children, node) {
//   children.forEach(child => {
//     // 兼容数组的情况
//     if (Array.isArray(child)) {
//       child.forEach(singleChild => {
//         render(singleChild, node)
//       })
//     } else {
//       render(child, node) // +2 -4
//     }
//   })
//   // return node
// }
// 更新节点属性: props内的href, className, 等给element, nodeValue 给textNode
function updateNode(node, preProps, nextProps) {
  Object.keys(preProps).filter(key => key !== 'children')
    .forEach(key => {
      if (key.slice(0, 2) === 'on') { // 这里做了简化，源码中使用合成事件
        const eventName = key.slice(2).toLocaleLowerCase()
        node.removeEventListener(eventName, nextProps[key])
      } else if (key in nextProps) {
        node[key] = ''
      }
    })
  Object.keys(nextProps).filter(key => key !== 'children')
    .forEach(key => {
      if (key.slice(0, 2) === 'on') { // 这里做了简化，源码中使用合成事件
        const eventName = key.slice(2).toLocaleLowerCase()
        node.addEventListener(eventName, nextProps[key])
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


// 结果： 遍历children(vnode array)， 构建以workInProgressFiber为首的链表结构
function reconcileChildren_Fiber (workInProgressFiber, children) {
  let preSibling = null
  // 补充更新的情况
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child // 取上一棵树的第一个
  let newFiber
  children.forEach((child, index) => {
    const isSameType = oldFiber && child && oldFiber.type === child.type
    if (isSameType) { // 复用，更新的情况
      newFiber = {
        node: oldFiber.node,
        base: oldFiber, 
        props: child.props,
        type: child.type,
        return: workInProgressFiber, // 父
        effectTag: UPDATE
      }
    } else if(!isSameType && child) { // 类型不同，child存在：新增
      newFiber = {
        node: null,
        base: null, // 初次
        props: child.props,
        type: child.type,
        return: workInProgressFiber, // 父
        effectTag: PLACEMENT
      }
    }
    if (!isSameType && oldFiber) { // 类型不同，旧的存在，child不存在： 在fiber中删除
      oldFiber.effectTag  = DELETE
      deletions.push(oldFiber)
    }
    if (oldFiber) { // 如果是更新的情况，遍历情况下同事往后移动oldFiber进行比较
      oldFiber = oldFiber.sibling // 下一次比较
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
  // 2、协调子元素, 构建子元素fiber架构： 将子元素vnode变为父元素链表指向结构
  const { children } = fiber.props
  reconcileChildren_Fiber(fiber, children)
}

// 更新函数节点: 取出vnode(jsx), 传给reconcileChildren_Fiber
function updateFunctionNode(fiber) {
  // 补充hook逻辑
  wipFiber = fiber
  // 源码是用链表，这里用数组
  wipFiber.hooks = []
  hookIndex = 0
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
  // 以上执行完成后，修改了workInProgress，内存重新城了进化了一部分的fiber
  // 2. 返回下一个任务： child > sibling > return -> sibling (返回给下个任务继续进行进化，最终会得到进化后的完整workInProgress)
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
  deletions.forEach(commitWorker) // 每一项触发删除
  commitWorker(wipRoot.child)
  // 保留上一次的fiber
  currentRoot = wipRoot
  // 提交后就不用根fiber了
  wipRoot = null
}

// 删除节点
function commitDeletions(fiber, parentNode) {
  // fiber有可能不存在fiber.node（Provider,Fragment元素），需要递归子节点然后删除
  if (fiber.node) {
    parentNode.removeChild(fiber.node)
  } else {
    commitDeletions(fiber.child, parentNode)
  }
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
  } else if (fiber.effectTag === UPDATE && fiber.node !== null) {
    updateNode(fiber.node, fiber.base.props, fiber.props)
  } else if (fiber.effectTag === DELETE && fiber.node !== null) {
    commitDeletions(fiber, parentNode)
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
  // 没有任务，还未提交，此时得到完全体：workInProgress，接下来从根进行commit
  if (!nextUnitWork && wipRoot) {
    // 进行commit提交: 从根fiber开始提交
    commitRoot()
  }
  // 递归
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)


/*** hooks相关  ****/ 
let wipFiber = null // 正在工作的fiber   ing
let hookIndex = null 
export function useState(init) {
  // 点击setState后，重新更新到updateFunctionComponent里会重新执行函数组件，执行useState走到这里
  // useState的目的是要改变当前hook.state,其中hook是用闭包保存的一个对象
  // 执行完返回去继续走commit去更新dom
  const oldHook = wipFiber.base && wipFiber.base.hooks[hookIndex] // 拿到专属hook，挂载为null
  // 当前hook 结构
  let hook = {
    state: oldHook ? oldHook.state : init, // 拿到专属state, 首次为init
    queue: []
  }
  // 模拟批量执行： 后面的会覆盖前面的
  const actions = oldHook ? oldHook.queue : [] // 非挂载有更新时，oldHook.queue里有state的数组
  actions.forEach(action => { // 依次修改了本次hook的state，为了拿到最新的state，达到最终修改hook.state的目的
    hook.state = action
  })
  // 当前hook操作 
  const setState = (action) => {
    hook.queue.push(action)
    // 重置wipRoot
    wipRoot = {
      base: currentRoot,
      props: currentRoot.props,
      node: currentRoot.node
    }
    nextUnitWork = wipRoot 
    deletions = [] // 重新渲染更新，充值删除操作
    // 赋值给下一个工作单元: 这里改变了nextUnitWork，在workLoop发生了更新，重新进行了更新执行，重新进行了流程
    // 一直进行到reconcileChildren_Fiber的更新分支，然后走commit到commitWorker，进行了更新分支，更新了属性updateNode
  }
  // 最后，如果有其他多个useHook的情况
  wipFiber.hooks.push(hook)
  hookIndex ++ 
  return [hook.state, setState]
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
