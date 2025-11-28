// style sheet
import './App.css';

// context
import CurrentUserProvider from './context/CurrentUser';

// components
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import SignUpForm from './components/users/forms/SignUpForm';
import LogInForm from './components/users/forms/LogInForm';
import UserPage from './components/users/user_pages/UserPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
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
            <Route exact path='/user-page/:username' element={<UserPage/>}/>
          </Routes>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
