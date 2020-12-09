import React, { Component } from 'react'
import { RouterContext } from './RouterContext'

export default class Redirect extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {
          context => {
            const { history } = context
            const { to, push=false } = this.props
            // 需要兼容字符串和对象的情况，这里做简化
            return ( // render中做跳转，只能借助另一个组件的生命周期
              <LifeCircle 
                didMount={() => {
                  push ? history.push(to) : history.replace(to)
                }}
              />
            )
          }
        }
      </RouterContext.Consumer>
    )
  }
}


 class LifeCircle extends Component {
  componentDidMount() {
    this.props.didMount.call(this, this)
  }
  render() {
    return null
  }
}
