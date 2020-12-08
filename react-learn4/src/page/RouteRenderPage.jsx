import React from 'react'
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom'

const Home = () => {
  return (
    <div>home</div>
  )
}
const Record = () => {
  return (
    <div>record</div>
  )
}
const Error = () => {
  return (
    <div>error</div>
  )
}
class AddPage extends React.Component {
  componentDidMount(){
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render(){
    return (
    <div>child , {this.props.count}</div>
    )
  }
}
// route三种渲染 children > component > render
export default function RouteRenderPage() {
  const [count, setCount] = React.useState(0)
  const add = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <button onClick={add}>add</button>
      <Router>
        <Link to="/home">home</Link>
        <Link to="/record">record</Link>
        <Link to="/add">add</Link>
        <Switch>
        <Route path="/home" 
          // children={() => <div>children</div>} 
          component={ Home } 
          // render={ () => <div>render </div> } 
        />
        <Route path="/record" component={Record}/>
        {/* component返回匿名组件方式，子组件每次都会挂载卸载（导致性能问题）, children和render则不会 */}
        <Route path="/add" component={() => <AddPage count={count}/>}/>
        {/* <Route path="/add" children={() => <AddPage count={count}/>}/> */}
        {/* <Route path="/add" render={() => <AddPage count={count}/>}/> */}
        <Route component={Error}/>
        </Switch>
      </Router>
    </div>
  )
}
