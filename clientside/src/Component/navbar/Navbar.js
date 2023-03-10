import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from '../../redux/AuthContext';
import { AuthContext } from '../../App';
import axios from 'axios';


function Navbar() {

  const {setState}=useContext(AuthContext)
     
    const [open, setOpen] = useState(false);
    const [searching,setSearching]=useState('')
    const [getSearching,setGetsearching]=useState([])
    const {authUser}=useContext(UserAuthContext)
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate=useNavigate()

    const [anchorElUser, setAnchorElUser] = React.useState(null);

  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    useEffect(()=>{
    let postSearch=async()=>{
             let res=searching ? await axios.post("http://localhost:8000/searchUser/" + searching)
             :" "
             setGetsearching(res.data)
            //  console.log(res.data,'res');
         }
         postSearch()
    },[searching])

    function logout(e){
      localStorage.removeItem("token")
      window.localStorage.removeItem("userProfile")
      localStorage.removeItem('user')
      setState(" ")
      navigate("/login")
  }

  return (
    <div>
    <div className="nav-bar-container-light grid grid-cols-3 gap-2 ">
          <div className=' header-logo' >
            <h1 className="text-3xl font-bold leading-normal pl-3 pb-2 text-slate-800 " onClick={(e)=>{
                navigate("/")
            }} ><span className='cursor-pointer '>pi-book</span> </h1>
          </div>
          {/* <div className=''> */}
          <div class="flex justify-center">
              <div class="mb-3 xl:w-96">
                <div class="input-group relative flex  items-stretch w-full py-2">
                  <input value={searching} onChange={(e)=>{setSearching(e.target.value)}}  type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
                  <button  onClick={(e) => setOpen(!open)} class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
                  </button>
                </div>
                {open ? (
                <div class="searchDiv input-group  items-stretch w-full py-2" style={{backgroundColor:"white"}}>
                  
                  {
                    getSearching.map((data)=>{
                      return(
                        <div className="postTopLeft mb-3 ">
                        <img    src={
                            data.profilePicture
                              ? PF + data.profilePicture
                              : PF + "sampleImg/noAvatar.jpg"
                          }
                        alt="images"
                        className="getPostProfielImg"
                        />
                        <div>
                          <p className="postUserName">{data.username}</p>
                        </div>
                      </div>
                      )
                    })
                  }

                </div>
                ):""
                }

              </div>
            </div>
         <div className="parantDropdown p-2 text-right">
         <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
            <img src={authUser.profilePicture? PF +authUser.profilePicture : PF +"sampleImg/noAvatar.jpg" } alt="profile img" className='navbarImg'/>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={handleCloseUserMenu}>
              <Link to={`profile/${authUser?.username}`} >
              <Typography textAlign="center">Profile</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography onClick={logout}  textAlign="center">Logout</Typography>
            </MenuItem>
        </Menu>
      </Box>
         </div>
          
        </div>    
</div>
  )
}

export default Navbar