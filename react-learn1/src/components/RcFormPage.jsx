import Input from '../components/Input'
import React, { Component } from 'react'
// import { createForm } from 'rc-form'
import createForm from '../components/FakeRcForm'

// 规则校验
const nameRules = { required: true, message: "请输⼊姓名！" };
const passworRules = { required: true, message: "请输⼊密码！" };

@createForm
// @createForm()
class RcFormPage extends Component {
  constructor(props) {
    super(props)
    this.state={}
  }
  componentDidMount() {
    this.props.form.setFieldsValue({username: 'default'})
  }
  submit = () => {
    const { getFieldsValue, validateFields } = this.props.form
    validateFields((err, val) => {
      if (err) {
        console.log('fail', err)
      } else {
        console.log('success', val)
      }
    })
    console.log('getFieldsValue', getFieldsValue())
  }
  render() {
    console.log(this.props, '---this.props')
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        { getFieldDecorator('username', { rules: [nameRules] })(<Input placeholder="username"/>) }
        { getFieldDecorator('passward', { rules: [passworRules] })(<Input placeholder="passward"/>) }
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}
export default RcFormPage