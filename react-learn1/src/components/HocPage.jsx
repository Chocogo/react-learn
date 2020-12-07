import React from 'react'

// 组件
const Child = (props) => {
return <div>i am Child, my name is {props.name}</div>
}

// hoc：接收一个组件，返回一个组件
const widthBorder = (Component) => props => {
  return (
    <div style={{ border: '1px solid', padding: '10px' }}>
      <Component {...props}></Component>
    </div>
  )
}
// const NewComp = widthBorder(widthBorder(Child))
@widthBorder
@widthBorder
class NewComp extends React.Component {
  render() {
    return <Child />
  }
}
// const NewComp = widthBorder(widthBorder(Child))

export default function HocPage() {
  return (
    <div>
      this is hoc, 
      <NewComp name="tom"/>
    </div>
  )
}
