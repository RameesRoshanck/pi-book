import './App.css';
import LoginPage from './Pages/AuthPage/LoginPage';
import HomePage from './Pages/homepage/HomePage';
import ProfilePage from './Pages/profilepage/ProfilePage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<LoginPage/>} />
        <Route path='/' element={<HomePage/>} />
        <Route path='/profile/:username' element={<ProfilePage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
