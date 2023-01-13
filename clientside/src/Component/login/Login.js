import React from 'react'
import './login.css'
import TextField from '@mui/material/TextField';

function Login() {


  return (
    <div className="parantDiv">
    <div className="auth-form-conatiner" >
      <h2>Login</h2>
      <form className="login-form">

      <TextField
      label="email"
      name='email' 
      placeholder="ckmhdroshan@gmail.com"
      id="email"
      type='email'
      variant="standard" />

   
      <TextField
      label="password"
      name='password'
      placeholder="987"
      type="password"
      id="password"
      autoComplete="current-password"
      variant="standard"
      />

        <button className="btn" type="submit" >Log In</button>
      </form>
      <button  onClick={()=>{
            
      }} className="link-btn">Forgotten password? </button>
      
      <button onClick={()=>{
             
      }} className="link-btn">Don't have an account ? Sign up here..</button>
    </div>
  </div>
  )
}

export default Login