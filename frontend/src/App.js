import './App.css';
import CurrentUserProvider from './context/CurrentUser';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        
      </CurrentUserProvider>
    </div>
  );
}

export default App;
