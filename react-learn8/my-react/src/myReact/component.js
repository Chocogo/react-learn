
export default class component {
  // 提供判断是否为classComponent的方法
  static isReactComponent = true 
  constructor(props, context) {
    this.props = props
    this.context = context
  }
}
