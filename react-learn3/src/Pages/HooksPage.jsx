import React, {useReducer} from 'react'
import { countReducer } from '../store'

// useReducer 第三个参数，一个可以修改初始值（第二个参数）的函数
const init = arg => {
  return arg - 0
}
export default function HooksPage() {
  const [count, dispatch] = useReducer(countReducer, '0', init)

  return (
    <div>
      useReducer demo
      {count}
      <button onClick={ ()=> dispatch({ type: 'ADD' }) }>add</button>
    </div>
  )
}
