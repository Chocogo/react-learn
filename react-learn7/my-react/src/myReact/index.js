// 实现createElement  => babel-loader处理后调用
function createElement(type, config, children) {
  // 简化操作，处理 __self, __source
  if (config) {
    delete config.__self
    delete config.__source
  }
  // 简化操作
  let props = {
    ...config,
  }
  console.log({
    type,
    props
  }, '---')
  return {
    type,
    props
  }
}

export default {
  createElement
}