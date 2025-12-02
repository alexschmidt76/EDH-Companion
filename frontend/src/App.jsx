// style sheet
import './App.css';

// context
import CurrentUserProvider from './context/CurrentUser';

// components
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import SignUpForm from './components/users/forms/SignUpForm';
import LogInForm from './components/users/forms/LogInForm';
import UserPage from './components/users/user_pages/UserPage';
import UserNotFoundPage from './components/users/user_pages/UserNotFoundPage';
import UserSearchForm from './components/users/forms/UserSearchForm';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <NavigationBar/>
          <Routes>
            {/* the paths '/' and '/home' will have the same destination */}
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/sign-up-form' element={<SignUpForm/>}/>
            <Route path='/log-in-form' element={<LogInForm/>}/>
            <Route path='/user-page' element={<UserSearchForm/>}>
              <Route path=':username/:activePage' element={<UserPage/>}/>
              <Route path='user-not-found' element={<UserNotFoundPage/>}/>
            </Route>
          </Routes>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
