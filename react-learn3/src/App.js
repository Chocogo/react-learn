import './App.css';
import ReduxHookPage from './Pages/ReduxHookPage';
import ReduxPage from './Pages/ReduxPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReduxPage />
        <ReduxHookPage />
      </header>
    </div>
  );
}

export default App;
