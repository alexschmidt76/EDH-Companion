import './App.css';
import CurrentUserProvider from './context/CurrentUser';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import SignUpForm from './components/users/SignUpForm';
import LogInForm from './components/users/LogInForm';
import { BrowserRouter as Router, Routes, Route , useNavigate} from 'react-router-dom';

function App() {
  useNavigate()('/');
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <NavigationBar/>
          <Routes>
            {/* the paths '/' and '/home' will have the same destination */}
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/sign-up-form' element={<SignUpForm/>}/>
            <Route exact path='/log-in-form' element={<LogInForm/>}/>
          </Routes>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
