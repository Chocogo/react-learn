import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Redirect } from 'react-router-dom'
// isLogin ? 获取location 中的state 的redirect ： 展示可以登录的操作
export default function LoginPage() {
  const isLogin = useSelector(({ user }) => user.isLogin)
  const dispatch = useDispatch()
  const location = useLocation()

  const login = () => {
    // dispatch({ type: 'LOGIN_SUCCESS' })
    dispatch({ type: 'sagaLogin' })
  }

  if (isLogin) {
    const { redirect='/' } = location.state || {}
    return <Redirect to={redirect}/>
  }
  return (
    <div>
      LoginPage--{isLogin}
      <div onClick={ login }><button>登录</button></div>
    </div>
  )
}
