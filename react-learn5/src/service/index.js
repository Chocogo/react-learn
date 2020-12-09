
export function loginService(userInfo) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if (userInfo.userName === 'xiaoming') {
        resolve('success')
      } else {
        resolve('fail')
      }
    }, 1000)
  })
}
