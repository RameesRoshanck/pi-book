import React, { useContext, useState } from 'react'
import './login.css'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast } from 'react-toastify';
import axios from 'axios'
import { AuthContext } from '../../App';
import { UserAuthContext } from '../../redux/AuthContext';

function Login() {
   
  const {setState}=useContext(AuthContext)
  const {setAuthUser}=useContext(UserAuthContext)

  let navigate = useNavigate();
  const [login,setLogin]=useState({
    email:"",
    password:""
  })
  const [loginErr,setLoginErr]=useState(false)

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
      };

  
  const handleChange=(e)=>{
    e.preventDefault()
      const {name,value}=e.target
     setLogin({
       ...login,[name]:value
     })
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()
      if(!login.email || !login.password){
       setLoginErr(true)
       return false
      }else{
       await axios.post("http://localhost:8000/login",login).then((result)=>{
         if(result.data.message==='Incorrect email Id'){
            toast("Incorrect email Id",toastOptions)
         }else if(result.data.message==='incorect password'){
            toast("incorect password",toastOptions)
         }else{
          window.localStorage.setItem("userProfile",JSON.stringify(result.data.user))
          localStorage.setItem('user',JSON.stringify(result.data.user.username))
          localStorage.setItem('token',JSON.stringify(result.data.token))
          setState(result.data.user.username)
          setAuthUser(result.data.user)
           navigate("/login")
         }
       }).catch((error)=>{
         console.log(error) 
       })
      }
   }
  return (
    <div className="parantDiv">
    <div className="auth-form-conatiner" >
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>

      <TextField
          label="email"
          name='email' 
          value={login.email}
          onChange={handleChange}
          id="email"
          type='email'
          variant="standard" />
          <p>{loginErr && !login.email && <label style={{color:"red"}}>email is required</label>}</p>

   
          <TextField
          label="password"
          name='password'
          value={login.password}
          onChange={handleChange}
          type="password"
          id="password"
          autoComplete="current-password"
          variant="standard"
          />
        <p>{loginErr && !login.password && <label style={{color:"red"}}>password is required</label>}</p>

        <button className="btn" type="submit" >Log In</button>
      </form>
      <button  onClick={()=>{
            navigate("/forgetPassword")
      }} className="link-btn">Forgotten  password? </button>
      
      <button onClick={()=>{
             navigate("/signup")
      }} className="link-btn">Don't have an account ? Sign up here..</button>
    </div>
    <ToastContainer/>
  </div>
  )
}

export default Login