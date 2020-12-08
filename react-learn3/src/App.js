import './App.css';
import HooksPage from './Pages/HooksPage';
import ReduxHookPage from './Pages/ReduxHookPage';
import ReduxPage from './Pages/ReduxPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReduxPage />
        <ReduxHookPage />
        {/* <HooksPage /> */}
      </header>
    </div>
  );
}

export default App;
