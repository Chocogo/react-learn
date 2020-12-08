import './App.css';
import ReduxPage from './component/ReduxPage';
// import './utils/compose'
import React, {useState} from 'react'
function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setShow(show => !show)}>trigger</button>
        { show &&  <ReduxPage />}
      </header>
    </div>
  );
}

export default App;
