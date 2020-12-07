import React, { Component } from 'react'
import { ThemeContext  } from '../context'

class ContextChildren extends Component {
  // static contextType = ThemeContext
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div style={ {color: this.context.theme} }>
        this is context child
      </div>
    )
  }
}
ContextChildren.contextType = ThemeContext
export default ContextChildren
