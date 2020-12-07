import { useRef } from 'react'
// 存储数据: eg。username, password
class FormStore {
  constructor() {
    this.store = {}
    this.fieldEntities = [] // 收集的field
    this.callbacks = {}
  }
  setCallbacks = (callbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...callbacks
    }
  }
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity)
    // 销毁操作
    return () => {
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name]
    }
  }
  getFieldValue = (name) => {
    return this.store[name]
  }
  getFieldsValue = (name) => {
    return this.store
  }
  setFieldsValue = newStore => {
    this.store = {
      ...this.store,
      ...newStore
    }
    // 设置的时候更新组件
    this.fieldEntities.forEach(entity => {
      const { name } = entity.props
      Object.keys(newStore).forEach(setKey => {
        if (name === setKey) {
          entity.onStoreChange()
        }
      })
    })
  }
  submit = () => { // 提交
    const errs = this.validate()
    const {onFinish, onFinishFailed} = this.callbacks
    if (errs.length === 0) { // 成功: 返回所有值
      onFinish(this.getFieldsValue())
    } else { // 失败： 返回错误信息
      onFinishFailed(errs)
    }
  }
  validate = () => { // 规则校验方法
    let errs = []
    this.fieldEntities.forEach(entity => {
      const { name, rules } = entity.props
      const value = this.getFieldValue(name)
      const rule = rules[0]
      const { required, message } = rule
      if (required && (value === undefined || value === '')) {
        errs.push({
          [name]: message,
          value
        })
      }
    })
    return errs
  }

  getForm = () => { // 提供使用方法
    return {
      setCallbacks: this.setCallbacks,
      submit: this.submit,
      registerFieldEntities: this.registerFieldEntities,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue
    }
  }
}

export default function useForm(form) {
  const formRef = useRef()
  if (!formRef.current) {
    if (form) { // form表单可能用到
      formRef.current = form
    } else { // 第一次没有，需要new 一个
      formRef.current = new FormStore().getForm()
    }
  }
  return [formRef.current]
}
