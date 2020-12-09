import React, { Component } from 'react'
import Router from './Router'
import { createBrowserHistory } from 'history'

export default class BrowserRouter extends Component {
  constructor(props){
    super(props)
    this.history = createBrowserHistory()
  }
  render() {
    return (
      // 基于router，主要是实现router
      <Router history={this.history}>{this.props.children}</Router>
    )
  }
}
