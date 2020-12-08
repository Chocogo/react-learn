import './App.css';
import HooksPage from './Pages/HooksPage';
import ReduxHookPage from './Pages/ReduxHookPage';
import ReduxPage from './Pages/ReduxPage';
import RouterPage from './Pages/RouterPage';
import { isPlainObject } from './utlis'
console.log(isPlainObject({a: '1'}))
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReduxPage />
        <ReduxHookPage />
        <HooksPage />
        <RouterPage />
      </header>
    </div>
  );
}

export default App;
