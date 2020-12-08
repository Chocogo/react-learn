import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default connect(
  ({user}) => ({isLogin: user.isLogin}),
  {
    login: () => ({ type: 'LOGIN_SUCCESS' })
  }
)(function LoginPage({isLogin, login, location}) {
  console.log(location, '--location')
  if (isLogin) {
    const { redirect='/home' } = location.state || {}
    console.log(redirect, '---redirect')
    return <Redirect to={redirect} />
  }
  return (
    <div>
      login
      <button onClick={ login }>login</button>
    </div>
  )
})
