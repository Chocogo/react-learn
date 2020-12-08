import React, { Component } from 'react'
import store from '../store'
export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => { // 订阅，触发更新
      this.forceUpdate()
    })
  }
  componentWillUnmount() { // 取消订阅
    this.unsubscribe && this.unsubscribe()
  }
  asyAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        debugger
        return dispatch({ type: 'ADD' })
      }, 500)
    })
  }
  promiseAdd = () => {
    store.dispatch(Promise.resolve({
      type: 'ADD'
    }))
  }
  render() {
    return (
      <div>
        {store.getState()}
        <button onClick={ () => store.dispatch({ type: 'ADD' }) }>add</button>
        <button onClick={ () => store.dispatch({ type: 'MINUS', payload: 10 }) }>minus</button>
        <button onClick={ this.asyAdd }>asyAdd</button>
        <button onClick={ this.promiseAdd }>promiseAdd</button>
      </div>
    )
  }
}
