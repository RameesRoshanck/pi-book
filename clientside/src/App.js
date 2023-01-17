import './App.css';
import LoginPage from './Pages/AuthPage/LoginPage';
import HomePage from './Pages/homepage/HomePage';
import ProfilePage from './Pages/profilepage/ProfilePage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {createContext, useEffect, useState } from 'react'
import ChatPages from './Pages/Chat/ChatPages';
import SignupPages from './Pages/AuthPage/SignupPages';
import ForgetPasswordPages from './Pages/ResetPage/ForgetPasswordPages';
import ResetPasswordPages from './Pages/ResetPage/ResetPasswordPages'
export const AuthContext=createContext(null)

function App() {


const [state,setState]=useState(null)

  useEffect(()=>{
  const users= localStorage.getItem('user')
  setState(users)
  },[state])
  

  return (
    <AuthContext.Provider value={{state,setState}}>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={state ? <HomePage/> : <LoginPage/>} />
        <Route exact path='/signup' element={<SignupPages/> } />
        <Route path='/' element={state ? <HomePage/> : <LoginPage/> } />
        <Route path='/profile/:username' element={<ProfilePage/>} />
        <Route path='/chat' element={<ChatPages/>} />
        <Route path='/forgetPassword' element={<ForgetPasswordPages/>} />
        <Route path='/reset/:token' element={<ResetPasswordPages/>} />
      </Routes>
      </BrowserRouter>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
