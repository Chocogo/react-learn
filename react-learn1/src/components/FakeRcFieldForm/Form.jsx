import React from 'react'
import FieldContext from './FieldContext';
import useForm from './useForm'

export default function Form({ onFinish, onFinishFailed, children, form }, ref) {
  const [formInstance] = useForm(form)
  React.useImperativeHandle(ref, () => formInstance)
  formInstance.setCallbacks({
    onFinish, 
    onFinishFailed
  })
  return (
    <form onSubmit={(e) => {
      e.preventDefault(); 
      console.log('submit')
      formInstance.submit()
    }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}
