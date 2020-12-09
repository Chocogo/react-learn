import React from 'react'
// import { Redirect, Route } from 'react-router-dom'
import { Redirect, Route } from '../MyRouter'
import { connect } from 'react-redux'


export default connect(
  ({ user }) => ({ isLogin: user.isLogin })
)(function PrivateRoute({ isLogin, component: Component, ...rest }) {
  return (
    <Route {...rest} render={ 
      props => ( // 必须要有返回，不能使用{}
        isLogin 
          ? <Component {...props}/>
          : <Redirect to={{
              pathname: '/login',
              state: { redirect: props.location.pathname }
            }}/>
      )
    } />  
  )
})
