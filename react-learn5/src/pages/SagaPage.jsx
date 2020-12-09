import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../component/PrivateRoute'
import LoginPage from './LoginPage'
import { connect } from 'react-redux'

const Index = connect(
  ({user})=>({userName: user.userName})
)((props) => <h2>index, {props.userName ? props.userName : '未登录'}</h2>)
const Product = () => <h2>Product</h2>


export default class SagaPage extends Component {
  render() {
    return (
      <Router>
        <Link to="/">index</Link>
        <Link to="/product">product</Link>
        <Link to="/login">login</Link>
        <Switch>
          <Route exact path="/" component={Index} />
          {/* <Route path="/product" render={() => <div>product</div>}/> */}
          <PrivateRoute path="/product" component={ Product } />
          <Route path="/login" component={ LoginPage }/>
        </Switch>
      </Router>
    )
  }
}
