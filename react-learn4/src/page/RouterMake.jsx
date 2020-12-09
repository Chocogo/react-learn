import React from 'react'
import { BrowserRouter as Router, Link, Route } from '../MyRouter'
const Index = () => {
  return (
    <h2>index</h2>
  )
}
const User = () => {
  return (
    <h2>User</h2>
  )
}
const Good = () => {
  return (
    <h2>Good</h2>
  )
}
const Login = () => {
  return (
    <h2>Login</h2>
  )
}

export default function RouterMake() {
  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户</Link>
      <Link to="/good">商品</Link>
      <Link to="/login">登录</Link>
      <Route path="/" component={ Index } />
      <Route path="/user" component={ User } />
      <Route path="/good" component={ Good } />
      <Route path="/login" component={ Login } />
    </Router>
  )
}
