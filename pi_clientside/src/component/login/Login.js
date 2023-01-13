import React,{useContext, useRef} from 'react'
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import './login.css'
import axios from 'axios';
import swal from 'sweetalert'
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
// import { loginCall } from '../../ApiCall';
// import { AuthContext } from '../../Context/AuthContext';



function Login() {

    let navigate = useNavigate();
    // const [loginErr,setLoginErr]=useState(false)

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
    // const handleSubmit=async(e)=>{
    //    e.preventDefault()
    //    loginCall({login.email,login.password})
    //    if(!login.email || !login.password){
    //     setLoginErr(true)
    //     return false
    //    }else{
    //     await axios.post("http://localhost:8000/login",login).then((result)=>{
    //       if(result.data.message==='Incorrect email Id'){
    //          toast("Incorrect email Id",toastOptions)
    //       }else if(result.data.message==='incorect password'){
    //          toast("incorect password",toastOptions)
    //       }else{
    //         setAuthUser(result.data.user)
    //         localStorage.setItem("token",result.data.token)
    //         navigate("/home")
    //       }
    //     }).catch((error)=>{
    //       console.log(error) 
    //     })
    //    }
    // }
// console.log(authUser,'login')

const email=useRef()
const password=useRef()
// const {user,isfetching,error,dispatch}=useContext(AuthContext)

const handleClick=(e)=>{
  // e.proventDefault()
  // loginCall({email:email.current.value,password:password.current.value},dispatch)
}


// console.log(user);
  return (
    <div className="parantDiv">
        <div className="auth-form-conatiner" >
          <h2>Login</h2>
          <form onSubmit={handleClick} className="login-form">

          <TextField
          label="email"
          name='email' 
          placeholder="ckmhdroshan@gmail.com"
          id="email"
          type='email'
          variant="standard" />
          ref={email}
          {/* <p>{loginErr && !login.email && <label style={{color:"red"}}>email is required</label>}</p> */}

       
          <TextField
          label="password"
          name='password'
          placeholder="987"
          type="password"
          id="password"
          autoComplete="current-password"
          variant="standard"
          ref={password}
          />
        {/* <p>{loginErr && !login.password && <label style={{color:"red"}}>password is required</label>}</p> */}
            <button className="btn" type="submit" >Log In</button>
          </form>
          <button  onClick={()=>{
                 navigate("/reset")
          }} className="link-btn">Forgotten password? </button>
          
          <button onClick={()=>{
                 navigate("/signup")
          }} className="link-btn">Don't have an account ? Sign up here..</button>
        </div>
        <ToastContainer/>
      </div>
  )
}

export default Login