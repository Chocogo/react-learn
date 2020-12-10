import { TEXT } from "./const"
import Component from './component'
// 实现createElement  => babel-loader处理后调用
function createElement(type, config, ...children) {
  // 简化操作，处理 __self, __source
  if (config) {
    delete config.__self
    delete config.__source
  }
  // 兼容defaultProps
  let defaultProps = {}
  if (type && type.defaultProps) {
    defaultProps = type.defaultProps
  }
  // 简化操作
  let props = {
    ...defaultProps,
    ...config,
    children: children.map(child => typeof child === 'object' ? child : ({
      type: TEXT,
      props: {
        children: [],
        nodeValue: child
      }
    }))
  }
  return {
    type,
    props
  }
}

export default {
  createElement,
  Component
}