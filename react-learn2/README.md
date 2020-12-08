redux
中间件
// 1、compose处理middleChain后，dispatch变为 a(b(c(dispatch)))
// 2、每个middleware的格式需要是 next => action => console.log('操作')； next(action)
// 3、middleware作为复合高阶函数是为了延迟执行，如果直接执行则会从内外往外执行；函数形式则
// 可以外层执行后，将next(action)的结果逐步传递给内层去执行（解洋葱），最终拿到最内层增强后
// 的dispatch执行action
// 4、如a(b(c(dispatch)))({type: 'action'})的执行顺序
// 4-1, console.log('a操作')， return 执行next(action),即b(c(dispatch))({type:'action'})
// 4-2, 由于立即执行了b(c(dispatch))({type:'action'})，即console.log('b操作'),
// return next(action) 去执行c(dispatch)({type: 'action'})
// 4-3, 同理，console.log('c操作')， 执行next(action),此时next即为初代dispatch,
// action依旧是{type: 'action}, 之后便是走了reducer流程
let A = (d) => (a) => {console.log('a');d(a)}
let B = (d) => (a) => {console.log('b');d(a)}
let C = (d) => (a) => {console.log('c');d(a)}
let dispatch = A(B(C((arg)=> {console.log(arg)})))
dispatch('action') 
//a
//b
//c
// action