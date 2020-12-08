import React from 'react'
import {HashRouter as Router, Link, Route, Switch } from 'react-router-dom' 
import Home from './Routes/Home'
import Detail from './Routes/Detail'
import Record from './Routes/Record'
import _404Page from './Routes/_404Page'
export default function RouterPage() {
  return (
    <div>
      <Router>
        <Link to="/home">home</Link>
        <Link to="/record">record</Link>
        <Link to="/detail">detail</Link>
        {/* switchd独占，只能匹配一个，当所有都不能匹配到时匹配最后一个 */}
        <Switch >
          <Route path="/home" component={Home}/>
          <Route path="/record" component={Record}/>
          <Route path="/detail" component={Detail}/>
          <Route component={_404Page}/>
        </Switch>
      </Router>
    </div>
  )
}
