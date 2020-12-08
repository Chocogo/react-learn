import React from 'react'
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom'

const Home = () => {
  return(
    <div>home</div>
  )
}

const Product = ({match}) => {
  console.log(match)
  const { params } = match // 动态路由
  return(
  <div>Product, {params.id}</div>
  )
}

const Detail = () => {
  return(
  <div>detail</div>
  )
}

// 嵌套路由
const More = ({ match }) => {
  const {url} = match
  return(
    <div>
      More
      <Link to={ url + '/detail' }>see more</Link>
      <Route path={url + '/detail'} component={Detail}/>
    </div>
  )
}

export default function RouterPage() {
  return (
    <div>
      RouterPage
      <Router >
        <Link to="/home">home</Link>
        <Link to="/product">product</Link>
        <Link to="/more">more</Link>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/product/:id" component={Product}/>
          <Route path="/more" component={More}/>
          
        </Switch>
      </Router>
    </div>
  )
}
