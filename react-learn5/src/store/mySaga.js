// saga (mySaga监听)（handleSage: 操作）
// takeEvery: subscribe  
// call: 异步请求   
// put: dispatch
import { put, call, takeEvery } from 'redux-saga/effects'
import { loginService } from '../service'

function* loginHandle(action) {
  const res = yield call(loginService, {userName: 'xiaoming'})
  console.log(res, '--res')
  const res1 = yield call(loginService, {userName: 'xiaoming'})
  console.log(res1, '--res1')
  yield put({ type: 'LOGIN_SUCCESS' })
}

function* mySaga() {
  yield takeEvery('sagaLogin', loginHandle)
}


export default mySaga