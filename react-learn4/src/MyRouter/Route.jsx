import React, { Component } from 'react'
import { RouterContext } from './RouterContext'
import matchPath from './matchPath' // 借用官方 react-router / module /matchPath.js
export default class Route extends Component {
  static contextType = RouterContext
  render() {
    const { location } = this.context
    const {path, component, children, render } = this.props
    // 是否有path, 有则match，没有则取传递的match（默认）
    const match = path ? matchPath(location.pathname, this.props) : this.context.match 
    // match 匹配 children component render
    // match 不匹配 children
    const props = {
      ...this.context,
      location,
      match
    }
    // 为了嵌套拿到的match是最近的层级
    return <RouterContext.Provider value={props}>
      {match 
              // 匹配的分支 children > component > render
              ? (children ? (typeof children === 'function' ? children(props) : children)
                // children 不存在, 判断component 
                : component ? React.createElement(component, props) 
                // component 不存在，进行render
                : render ? render(props): null)
              // 不匹配分支
              : (typeof children === 'function' ? children(...props) : null)}
    </RouterContext.Provider>
                
    // return match ? React.createElement(component) : null
  }
}
