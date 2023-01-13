import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Navbar from '../../Component/navbar/Navbar';
import Feed from '../../Component/feed/Feed'
import RightBar from '../../Component/rightbar/RightBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProfilePage() {
    const [user,setUser]=useState({})
    const username=useParams().username
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
     let fetchUser=async()=>{
        const res=await axios.get("http://localhost:8000/getSingleUserName/"+username)
        setUser(res.data);
     }
     fetchUser()
    },[username])


  return (
    <Box>
        <Navbar/>
        <Grid rowSpacing={{sm:0,md:0}} columnSpacing={{ md:1,}} style={{paddingTop:'65px'}}>
            <Grid item sm={12} md={12}>
                <Container  >
                <Container className='hidden md:block' >
                <Container className='hidden md:block'>
                <Grid item sm={12} md={12} className="profile">
                    <Grid item sm={12} md={12} className="profileTop">
                        <Grid className="profileCover">
                            <img src={ PF +"sampleImg/noCoverimg.jpg"} alt="coverPhoto" className='profileCoverPhoto' />
                            <img src={PF +"sampleImg/noAvatar.jpg" } alt="ProfilePhoto" className='profileCoverUserImage' />
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
                            <RightBar user={user}/>
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