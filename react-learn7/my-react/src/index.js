// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './myReact/';
import ReactDOM from './myReact/react-dom';

const jsx = (
  <div className="main">
    <div>首页</div>
    <a href="https://www.baidu.com">baidu</a>
  </div>
)

console.log(jsx, '---createElement')

ReactDOM.render(
  jsx,
  document.getElementById('root')
);

