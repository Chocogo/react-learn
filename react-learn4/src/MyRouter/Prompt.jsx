import React, { Component } from 'react'
import { RouterContext } from './RouterContext'

export default class Prompt extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {
          context => {
            const { history } = context
            const { when=false, message } = this.props
            const method = history.block
            if (!when) {
              return null
            }
            return <LifeCircle 
              didMount={self => {
                self.release = method(message)
              }}
              unMount={self =>{
                self.release()
              }}
            />
          }
        }
      </RouterContext.Consumer>
    )
  }
}

class LifeCircle extends Component {
  componentDidMount() {
    this.props.didMount(this)
  }
  componentWillUnmount() {
    this.props.unMount(this)
  }
  render(){
    return null
  }
}
