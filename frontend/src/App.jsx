import './App.css';
import CurrentUserProvider from './context/CurrentUser';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SignUpForm from './components/users/SignUpForm';
import LogInForm from './components/users/LogInForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <Navigation/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path='/sign-up-form' element={<SignUpForm/>}/>
            <Route exact path='/log-in-form' element={<LogInForm/>}/>
          </Routes>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
