import './App.css';
import CurrentUserProvider from './context/CurrentUser';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <Navigation/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
          </Routes>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
