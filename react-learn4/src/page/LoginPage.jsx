import React from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { Redirect } from '../MyRouter'

export default connect(
  ({user}) => ({isLogin: user.isLogin}),
  {
    login: () => ({ type: 'LOGIN_SUCCESS' })
  }
)(function LoginPage({isLogin, login, location}) {
  if (isLogin) {
    const { redirect='/' } = location.state || {}
    return <Redirect to={redirect} />
  }
  return (
    <div>
      login
      <button onClick={ login }>login</button>
    </div>
  )
})
