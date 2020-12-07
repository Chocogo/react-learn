import React, { useContext } from 'react'
import { ThemeContext } from '../context'

export default function ContextChildFun() {
  const context = useContext(ThemeContext)
  console.log(context)
  return (
    <div style={ {color: context.theme} }>
      ContextChildFun 
    </div>
  )
}
