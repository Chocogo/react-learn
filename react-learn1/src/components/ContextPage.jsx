import React, { Component } from 'react'
import { NameProvider, ThemeProvider } from '../context'
import ContextChildren from './ContextChild'
import ContextChildFun from './ContextChildFun'
import ContextConsumer from './ContextConsumer'

export default class ContextPage extends Component {
  constructor(){
    super()
    this.state ={
      value: {theme: 'red'}
    }
  }
  toggle = () => {
    const value = { theme: this.state.value.theme === 'red' ? 'green' : 'red'}
    this.setState({
      value
    })
  }
  render() {
    return (
      <div>
        Context page
        <button onClick={this.toggle}>change</button>
        <ThemeProvider value={this.state.value}>
          <NameProvider value={ {name: 'root name'} }>
            <ContextChildren  />
            <ContextChildFun />
            <ContextConsumer />
          </NameProvider>
        </ThemeProvider>
      </div>
    )
  }
}
