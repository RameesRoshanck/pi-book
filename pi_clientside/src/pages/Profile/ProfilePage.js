import React, { useEffect, useState } from 'react'
import Feed from '../../component/Feeds/Feed'
import Navbar from '../../component/navbar/Navbar';
import Rightbar from '../../component/Rightbar/Rightbar'
// import Sidebar from '../../component/Sidebar/Sidebar'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './profilePage.css'
import image from '../../assets/elonmask.jpeg'
import backCoverPhoto from '../../assets/background.jpeg'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ProfilePage() {
    const [user,setUser]=useState({})
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const username=useParams().username

   

    useEffect(()=>{
        const fetchUser=async()=>{
            let res=await axios.get('http://localhost:8000/getSingleUserName/'+username)
            setUser(res.data)
          }
        fetchUser();
        },[username])

  return (
        <Box>
        <Navbar/>
        <Grid rowSpacing={{sm:0,md:0}} columnSpacing={{ md:1,}} style={{paddingTop:'65px'}}>
            <Grid item sm={12} md={12}>
                {/* <Sidebar/> */}
                <Container  >
                <Container className='hidden md:block' >
                <Container className='hidden md:block'>
                <Grid item sm={12} md={12} className="profile">
                    <Grid item sm={12} md={12} className="profileTop">
                        <Grid className="profileCover">
                            <img src={user.coverPicture ? PF+user.coverPicture : PF +"sampleImg/noCoverimg.jpg"} alt="coverPhoto" className='profileCoverPhoto' />
                            <img src={user.profilePicture ? PF+user.profilePicture : PF +"sampleImg/noAvatar.jpg" } alt="ProfilePhoto" className='profileCoverUserImage' />
                            <PhotoCameraIcon className='profileCoverUserImageIcon' />
                        </Grid>
                        <br/>
                        <Grid className="profileInfo">
                        <h3 className="profileInfoName">{user.username}</h3>
                        <span className="profileinfoDiscretion">{user.desc}</span>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={{sm:2}} columnSpacing={{ md:1,}} className="profileBottom" >
                        <Grid  item sm={12}  md={5}>
                            <Rightbar user={user}/>
                        </Grid>
                        <Grid item sm={12} md={7}>
                            <Feed username={username}/>
                        </Grid>
                       
                    </Grid>
                </Grid>
                </Container>
               </Container>
               </Container>
            </Grid>
        </Grid>
    </Box>
  )
}

export default ProfilePage