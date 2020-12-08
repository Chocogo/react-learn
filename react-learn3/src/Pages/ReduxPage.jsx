import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { bindActionCreators } from '../MyReactRedux/bindActionCreators'


@connect( 
  ({home}) => ({ count: home }), // mapStateToProps, 返回state
  // {
  //   add: () => ({ type: 'add' }) // mapDiapatchToProps ，可以是object,或者function, 最终都是返回对象
  // }
  (dispatch) => {
    // const add = () => dispatch({ type: 'ADD' })
    // const minus = () => dispatch({ type: 'MINUS' })
    const creators = {
      add: () => ({ type: 'ADD' }),
      minus: () => ({ type: 'MINUS' }),
    }
    const methods = bindActionCreators(creators, dispatch)
    // 可以通过bindActionCreators组合action
    return {dispatch, ...methods}
  },
  // 第三个参数：mergeProps函数
  (stateProps, dispatchProps, ownProps) => {
    return {...stateProps, ...dispatchProps, ...ownProps, ...{newProp: 'new props'}}
  }
)
class ReduxPage extends Component {
  
  asyAdd = () => {
    this.props.dispatch((dispatch, getState) => {
      setTimeout(() => {
        return dispatch({ type: 'ADD' })
      }, 500)
    })
  }
  promiseAdd = () => {
    this.props.dispatch(Promise.resolve({
      type: 'ADD'
    }))
  }
  render() {
    console.log(this.props)
    const { count, minus, add } = this.props
    return (
      <div>
        { count }
        <button onClick={ add }>add</button>
        <button onClick={ minus }>minus</button>
        <button onClick={ this.asyAdd }>asyAdd</button>
        <button onClick={ this.promiseAdd }>promiseAdd</button>
      </div>
    )
  }
}


export default ReduxPage