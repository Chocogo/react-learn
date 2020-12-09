import React, { Component } from 'react'
import matchPath from './matchPath'
import { RouterContext } from './RouterContext'
export default class Switch extends Component {
  render() {
    return (<RouterContext.Consumer>
      {
        context => {
          let match, element
          // 获取第一个child, 拿到element : children 有可能是Object|Array ,通过React.Children.foreach统一处理
          React.Children.forEach(this.props.children, child => {
            // match为undefined(首次)，或者为null(matchPath(pathname, child.props)匹配不到)时，执行element赋值和match设置
            // 还得注意path首次坑呢为空（404），macth则取默认
            // 最终得到匹配出来的element和match
            if (match == null && React.isValidElement(child)) {
              element = child
              const {pathname} = context.location
              const { path } = child.props
              // 这里发生了递归，为null时重新走if条件，匹配到时则跳出。
              // 每一项child都有path, 最后一项（404）没有
              match = path ? matchPath(pathname, child.props) : context.match 
              console.log(match, path)
            }
          }) 
          return match ? React.cloneElement(element) : null // 这里要用clone！
        }
      }
    </RouterContext.Consumer>)
  }
}
