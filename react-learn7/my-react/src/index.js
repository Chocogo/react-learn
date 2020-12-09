// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './myReact/';
import ReactDOM from './myReact/react-dom';

function FunctionComponent ({myName}) {
  return (
  <div>
    function component, name is {myName}
    <button onClick={() => {console.log('ok')}}>ok</button>
  </div>
  )
}
class ClassComp extends React.Component {
  static defaultProps = {
    myName: 'defaultName'
  }
  render() {
    return (
      <div> ClassComp,  {this.props.myName}  </div>
    )
  }
}

const jsx = (
  <div className="main">
    <div>首页</div>
    <a href="https://www.baidu.com">baidu</a>
    <FunctionComponent myName="tom"/>
    <ClassComp myName="Jenny"/>
  </div>
)

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

