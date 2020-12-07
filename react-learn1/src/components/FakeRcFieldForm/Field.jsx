import React, { Component } from 'react'
import FieldContext from './FieldContext'
export default class Field extends Component {

  componentDidMount() { // 挂载时，注册，收集field
    const { registerFieldEntities } = this.context
    this.cancelRegister = registerFieldEntities(this)
  }
  componentWillUnmount() {
    this.cancelRegister && this.cancelRegister()
  }
  // 强制更新的方法
  onStoreChange = () => {
    this.forceUpdate()
  }

  static contextType = FieldContext
  getControlled = () => { // 将值的属性封装成方法，执行后暴露
    const { name } = this.props
    const { getFieldValue, setFieldsValue } = this.context
    return {
      value: getFieldValue(name) || '',
      onChange: e => {
        const newValue = e.target.value
        // console.log(newValue)
        setFieldsValue({ [name]: newValue })
      }
    }
  }
  render() {
    const {children} = this.props
    const returnChildNode = React.cloneElement(children, this.getControlled())
    return returnChildNode
  }
}
