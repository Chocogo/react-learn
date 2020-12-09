import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// props: 接收to, component, 
// 获取isLogin
// isLogin ？渲染Component ：redirect 到登录，state带入to去redirect 
export default connect(
  ({user}) => ({isLogin: user.isLogin})
)(class PrivateRoute extends Component {
  render() {
    const { path, component: Component, isLogin, ...rest } = this.props
    return (<Route  {...rest} render={() => {
      return isLogin ? <Component {...this.props} /> : <Redirect to={{
        pathname: '/login',
        state: { redirect: path}
      }}/>
    }}/>)
  }
})
