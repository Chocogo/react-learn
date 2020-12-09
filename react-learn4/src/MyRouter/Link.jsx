import React, { Component } from 'react'
import { RouterContext } from './RouterContext'
export default class Link extends Component {
  static contextType = RouterContext
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleClick = (e) => {
    e.preventDefault()
    this.context.history.push(this.props.to)
  }
  render() {
    return <a href={this.props.to} onClick={this.handleClick}>{this.props.children}</a>
  }
}
