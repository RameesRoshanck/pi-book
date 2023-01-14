import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage'
import Test from './pages/Test';
import ProfilePage from './pages/Profile/ProfilePage';
import Admin from './AdminPages/Admin';
import ResetPasswordPages from './pages/ResetPages/ResetPasswordPages';
import ForgetPages from './pages/ResetPages/ForgetPages';
import ChatPages from './pages/chat/ChatPages';


function App() {



  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>} /> 
         <Route path='/signup' element={<SignupPage/>} />
        <Route exact path='/' element={<HomePage/>} />
        <Route path='/test' element={<Test/>} />
        <Route path='/profile/:username' element={<ProfilePage/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route exact path='/reset' element={<ResetPasswordPages/>} />
        <Route path='/reset/:token' element={<ForgetPages/>} />
        <Route path='/chat' element={<ChatPages/>} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
