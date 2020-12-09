import React, { Component } from 'react'
import { RouterContext } from './RouterContext'


export default class Router extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: this.props.history.location
    }
  }
  componentDidMount() {
    this.unlinten = this.props.history.listen(location => {
      this.setState({location})
    })
  }
  componentWillUnmount() {
    this.unlinten && this.unlinten()
  }
  render() {
    const { history } = this.props
    return (<RouterContext.Provider value={{ 
      history,
      location: this.state.location
      }}>
      {this.props.children}
    </RouterContext.Provider>)
  }
}
