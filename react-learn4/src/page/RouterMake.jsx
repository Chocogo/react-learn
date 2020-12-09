import React from 'react'
import { BrowserRouter as Router, Link, Route, useHistory, useLocation, useParams, useRouteMatch, withRouter, Switch } from '../MyRouter'
// import { BrowserRouter as Router, Link, Route, useHistory, useLocation, useParams, useRouteMatch, withRouter, Switch } from 'react-router-dom'
const Detail = () => {
  return (
    <div>detail</div>
  )
}
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
// const Good = ({ location, match }) => {
//   console.log(location, match)
//   const { params, url } = match
//   const { id } = params
//   // const { pathname } = location
//   return (
//     <div>
//       <h2>Good, id is  {id}</h2>
//       <Link to={url + '/detail'}>detail</Link>
//       <Route path={url + '/detail'} component={Detail} />
//     </div>
//   )
// }

// 使用render渲染，或者层级过多时，不能从props获取到location和match，可用use方法
// const Good = () => {
//   const match = useRouteMatch()
//   const history = useHistory()
//   const param = useParams()
//   const location = useLocation()
//   console.log(history, '--history', match, '--match', param, '--param', location, 'location')
//   const { params, url } = match
//   const { id } = params
//   // const { pathname } = location
//   return (
//     <div>
//       <h2>Good, id is  {id}</h2>
//       <Link to={url + '/detail'}>detail</Link>
//       <Route path={url + '/detail'} component={Detail} />
//     </div>
//   )
// }

// class组件嵌套情况（render是传入() => {<A />}）

const Good = withRouter(class Good extends React.Component {
  render() {
    const { match } = this.props
    console.log(this.props)
    const { params, url } = match
    const { id } = params
    return (
      <div>
        <h2>Good, id is  {id}</h2>
        <Link to={url + '/detail'}>detail</Link>
        <Route path={url + '/detail'} component={Detail} />
      </div>
    )
  }
})


const Login = () => {
  return (
    <h2>Login</h2>
  )
}
const _404Page = () => <h2>404Page</h2>

export default function RouterMake() {
  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户</Link>
      <Link to="/good/123">商品</Link>
      <Link to="/login">登录</Link>
      <Switch >
        <Route exact path="/" component={ Index } />
        <Route path="/user" component={ User } />
        {/* <Route path="/good/:id" component={ Good } /> */}
        <Route path="/good/:id" render={ () => <Good /> } />
        <Route path="/login" component={ Login } />
        <Route component={_404Page}/>
      </Switch>
    </Router>
  )
}
