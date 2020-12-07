import React from 'react'

export default function createForm (Comp) {
  return class extends React.Component {
    constructor() {
      super()
      this.state = {}
      this.options = {}
    }
    handleValue = e => {
      const { name, value } = e.target
      this.setState({ [name]: value })
    }
    getFieldDecorator = (field, option) => InputCom => { // 装饰器的使用方法，接收一field, comp
      this.options[field] = option
      return React.cloneElement(InputCom, {
        name: field,
        value: this.state[field] || '',
        onChange: this.handleValue
      })
    }
    getFieldsValue = () => {
      return this.state
    }
    setFieldsValue = (newStore) => {
      this.setState(newStore)
    }
    validateFields = (callback) => {
      let err = []
      for (let field in this.options) {
        const rule = this.options[field].rules[0]
        const { required, message } = rule
        const value = this.state[field]
        if (required && (value === undefined || value === '')) {
          err.push({
            field,
            message
          })
        }
      }
      if (err.length === 0) {
        callback(null, this.state)
      } else {
        callback(err, this.state)
      }
    }
    getFroms = () => {
      return {
        form: {
          validateFields: this.validateFields,
          getFieldDecorator: this.getFieldDecorator,
          getFieldsValue: this.getFieldsValue,
          setFieldsValue: this.setFieldsValue,
        }
      }
    }
    render() {
      return <Comp {...this.props} {...this.getFroms()}/>
    }
  }
}
