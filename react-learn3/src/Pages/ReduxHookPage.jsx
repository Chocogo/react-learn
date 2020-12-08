import React, { useCallback } from 'react'
// import { useDispatch } from 'react-redux'
import { useSelector, useDispatch } from '../MyReactRedux'

export default function ReduxHookPage() {
  const count = useSelector(({home}) => home) // 返回数值
  const dispatch = useDispatch()
  const add = useCallback(() => {
    dispatch({ type: 'ADD' })
  },[dispatch])
  return (
    <div>
      redux hook
      { count }
      <button onClick={ add }>add</button>
    </div>
  )
}
