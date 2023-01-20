import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { UserAuthContext } from '../../redux/AuthContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };





function ProfilePage() {
    const [user,setUser]=useState({})
    const [file,setFile]=useState(null)
    const {authUser}=useContext(UserAuthContext)
    const username=useParams().username
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const desc=useRef()

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    useEffect(()=>{
     let fetchUser=async()=>{
        const res=await axios.get("http://localhost:8000/getSingleUserName/"+username)
        setUser(res.data);
     }
     fetchUser()
    },[username])



    const handleONSubmit=async(e)=>{
        e.preventDefault()
        console.log(username,'username');
        console.log(authUser.username,'authUser.username');
        if(username === authUser.username){
            const userCmd={
                userId:authUser._id,
                desc:desc.current.value
            }
            if(file){
                const data= new FormData()
                const fileName=file.name;
                data.append("file",file)
                data.append('name',fileName)
                userCmd.img=fileName
                try{
                    await axios.put("http://localhost:8000/uploadProfilePicture",data)
                }catch(error){
                    console.log(error,'append error');
                }
            }
            try{
                 await axios.post(`http://localhost:8000/descUpdate/${authUser._id}`,userCmd)
                window.location.reload()
            }catch(error){
                console.log(error);
            }
        }
    }

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
                            <img src={user?.coverPicture ? PF + user.coverPicture : PF +"sampleImg/noCoverimg.jpg"} alt="coverPhoto" className='profileCoverPhoto' />
                            <img src={user?.profilePicture ? PF + user.profilePicture : PF +"sampleImg/noAvatar.jpg" } alt="ProfilePhoto" className='profileCoverUserImage' />
                            <PhotoCameraIcon onClick={handleOpen} className='profileCoverUserImageIcon' style={{cursor:"pointer"}}  />
                        </Grid>
                        <br/>
                        <Grid className="profileInfo">
                        <h3 className="profileInfoName">{user?.username}</h3>
                        <span className="profileinfoDiscretion">{user?.desc}</span>
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

     
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"> To select the Image </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <input  type='file' id='file' name='file' accept=".png,.jpeg,.jpg" onChange={(e)=>{setFile(e.target.files[0])}}/>
                    <br/>
                    <input ref={desc} type="text" placeholder={"enter your discription"} className="postInput"  />
                     <br/>
                </FormControl>
                <Grid className='flex justify-evenly' >
                    <Button onClick={handleONSubmit} variant="contained" className='mr-2' color="success">submit</Button>
                    <Button variant="contained" onClick={ handleClose } color="error">Close</Button>
                </Grid>
            </Typography>
        </Box>
      </Modal>



    </Box>
  )
}

export default ProfilePage