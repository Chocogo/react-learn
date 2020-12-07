import React, { Component } from 'react'
import store from '../store'
export default class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => { // 订阅，触发更新
      this.forceUpdate()
    })
  }
  render() {
    return (
      <div>
        {store.getState()}
        <button onClick={ () => store.dispatch({ type: 'ADD', payload: 10 }) }>add</button>
        <button onClick={ () => store.dispatch({ type: 'MINUS', payload: 10 }) }>minus</button>
      </div>
    )
  }
}
