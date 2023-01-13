import React from 'react'
import './signup.css'
import TextField from '@mui/material/TextField';

function Signup() {
  return (
    <div className="parantDiv">


    {otpverify? 
     <div className="auth-form-conatiner">
     <h2>Enter the OTP</h2>
     <br />
     <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
     <br />
       <button className="btn" type="submit" onClick={(e)=>{verify(e)}} >Verify</button>
     </div>
     :
    
   <div className="auth-form-conatiner" >
     <h2>Sign-up Page</h2>
     <form onSubmit={handleSubmit} className="login-form">

     <TextField 
     label="username"
     name='username'
     value={input.username}
     onChange={handleChange}
     type='text'
     id="username"
     variant="standard" />
     <p>{signErr && !input.username && <label style={{color:"red"}}>username is required</label>}</p>

     <TextField
     label="email"
     name='email' 
     value={input.email}
     onChange={handleChange}
     id="email"
     type='email'
     variant="standard" />
      <p>{signErr && !input.email && <label  style={{color:"red"}}>email is required</label> }</p>

     <TextField  
     label="phone number" 
     type='phone'
     id="phone"
     name='phone'
     value={input.phone}
     onChange={handleChange}
     variant="standard" />
     <p>{signErr && !input.phone && <label  style={{color:"red"}}>phone number is required</label> }</p>

     <TextField
     label="password"
     name='password'
     value={input.password}
     onChange={handleChange}
     type="password"
     id="password"
     autoComplete="current-password"
     variant="standard"
   />
   <p>{signErr && !input.password && <label  style={{color:"red"}}>password is required</label> }</p>
       <button className="btn" type="submit" >Register</button>
     </form>
     <button className="link-btn">Forgotten password? </button>
     <button className="link-btn">Don't have an account ? Sign up here..</button>
     <ToastContainer/>
   </div>
   }
    

 </div>
  )
}

export default Signup