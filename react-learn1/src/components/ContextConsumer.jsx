import React, { Component } from 'react'
import {  NameConsumer, ThemeConsumer } from '../context'

export default class ContextConsumer extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    return (
      <ThemeConsumer >
        {themeContext => (
          <div style={ {color: themeContext.theme} }>
            this is context child
            <NameConsumer>
              {
                nameContext => (
                  <h2>{nameContext.name}</h2>
                )
              }
            </NameConsumer>
          </div>
        )}
      </ThemeConsumer>
    )
  }
}
