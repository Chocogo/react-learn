function f1 (arg) {
  console.log('f1', arg)
  return arg
}
function f2 (arg) {
  console.log('f2', arg)
  return arg
}
function f3 (arg) {
  console.log('f3', arg)
  return arg
}
// let res = f1(f2(f3('go'))) // f3, f2, f1

// reduce改写，compose函数
const compose = (...fns) => {
  // 边界
  if (fns.length === 0) {
    return arg => arg
  }
  if (fns.length === 1) {
    return fns[0]
  }
  return fns.reduce((accutor, current) => { 
    // accutor: a(b(c(args))), current: a(args)， b(args), c(args),
    // 之所以要返回一个函数，是为了传参，延迟执行，之后进行包裹，将传参传到底部
    console.log(accutor, '--accutor')
    console.log(current, '--current')
    return (...args) => {
      return accutor(current(...args))
    }
  })
}
let res = compose(f1,f2,f3)('go') // f3, f2, f1


console.log(res)

