import React, { Fragment, useContext, useEffect, useState } from 'react'
import './rightbar.css'
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UserAuthContext } from '../../redux/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';  
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../App';
import { addUserChat } from '../../Api/ChatRequest';


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


function RightBar({user}) {
  
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends]=useState([])
  const username=useParams().username
  const [followed,setFllowed]=useState(false)
  const {authUser,setAuthUser}=useContext(UserAuthContext)
  const {setState}=useContext(AuthContext)
  const [Following,setFolloweings]=useState([])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editProfile,setEditProfile]=useState({
    username:authUser.username,
    email:authUser.email,
    phone:authUser.phone,
    from:authUser.from,
    relationship:authUser.relationship,
    city:authUser.city
  })

  const handleChange=async(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    setEditProfile({
      ...editProfile,[name]:value
    })
  }


  // useEffect(()=>{
  //   setFllowed(authUser.followings.includes(user?.id))
  // },[authUser,user.id])





  useEffect(()=>{
    let userFriend=async()=>{
       try{
         await axios.get("http://localhost:8000/getFriends/"+ username).then((userFriends)=>{
           setFriends(userFriends.data)
         }).catch(err=>{
           console.log(err,'main error');
         })
       }catch(error){
         console.log(error,'fetchfriends');
       }
     }
     userFriend()
   },[username])


   useEffect(()=>{
    console.log('work ======');
   let fetchAllUser=async()=>{
      try{
        let {data}=await axios.get(`http://localhost:8000/unFollowersList/${authUser._id}`)
        setFolloweings(data.user)
      }catch(error){
        console.log(error);
      }
    }
    fetchAllUser()
   },[authUser._id])

   

  const handleClick=async()=>{
    try{
      if(followed){
        await axios.put("http://localhost:8000/unfollowUser/"+user._id+"/unfollow",{userId:authUser._id})
      }else{
        await axios.put("http://localhost:8000/followUser/"+user._id+"/follow",{userId:authUser._id})
      }
      setFllowed(!followed)
     }catch(error){
      console.log(error,'right bar handle click');
     }
  }


/* -------------------------- //update user details ------------------------- */

  const handleONSubmit=async(e)=>{
    e.preventDefault()
    if(username === authUser.username){
    try{
    await axios.put(`http://localhost:8000/${authUser._id}`,editProfile).then((res)=>{
      console.log(res.data.username,'=====================');  
      localStorage.setItem("userProfile",JSON.stringify(res.data))
      localStorage.setItem('user',JSON.stringify(res.data.username))
      setState(res.data.username)
      setAuthUser(res.data)
    })
    }catch(error){
      console.log(error,'handelonsubmit error in right ber');
    }
  }else{
    console.log("user is not found");
  }
  }


  //user add follow and add to chat 

  const handleFollow=async(id)=>{
    let putFollowing=async()=>{
      console.log(id,'id');
      try{
         let res= await axios.put("http://localhost:8000/followUser/"+id+"/follow",{userId:authUser._id})
      }catch(error){
        console.log(error);
      }
    }

    let postAddNewUser=async()=>{
      console.log(id,'id2');
      let addNewChatUser={
        senderId:authUser._id,
        receverId:id
      }
      try{
   let value=await axios.post("http://localhost:8000/chat",addNewChatUser)
      }catch(error){
        console.log(error);
      }
    }
    postAddNewUser()
    putFollowing()
  }


  const HomeRightBar=()=>{
    return(
     <div className="HomeRightBar">
        <h4 className="rightBarTitle ">Online Friends</h4>
           <hr className='posthr' />
            <ul className="rightBarFriendsList">
              {
                Following.map((obj)=>{
                  return(
                  <li className="rightbarFriends">
                 <div className="rightbarProfileImageContainer">
                  <img src={obj.profilePicture ? PF+obj.profilePicture : PF+"sampleImg/noAvatar.jpg"}  alt="img" className='rightBarProfileImg' />
                  <span className="rightBarOnline"></span>
                 </div>
                 <span className='rightBarUserName'>{obj.username}</span>
                 <Button className='follows' onClick={(e)=>{handleFollow(obj._id)}} variant="contained">Follow</Button>
                </li>
                  )
                })
              }
            </ul>
      </div>
    )
  }

  const ProfilePage=(e)=>{ 
    return(
      <>
         {
        user.username !==authUser.username && (
          <button className='rightBarFollowButton' onClick={handleClick} >
            {followed ? "Unfollow":"follow"}
            {followed ? <RemoveIcon/>:<AddIcon/>}
          </button>
        )
      } 
      <div className='flex justify-between' >
      <h3 className='profileRightBarTitle' >User Profile:</h3>
      <Button onClick={handleOpen} variant="contained">Edit Profile</Button>
      </div>
      <div className='rightBarInfo mb-8'>
        <div className="rightbarInfoItem mb-1">
          <span className="rightbarInfPlace">City:</span>
          <span className="rightbarInfPlaceName">{user.city}</span>
        </div>
        <div className="rightbarInfoItem mb-1 ">
          <span className="rightbarInfPlace">From:</span>
          <span className="rightbarInfPlaceName">{user.from}</span>
        </div>
        <div className="rightbarInfoItem mb-1">
          <span className="rightbarInfPlace">Relationship:</span>
          <span className="rightbarInfPlaceName">{user.relationship}</span>
        </div>
      </div>
      <h2>User Friends</h2>
      <div className="rightBarFollowings">
        {
          friends.map((friend)=>(
            <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}} >
            <div className="rightBarFollowing">
            <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"sampleImg/noAvatar.jpg"} alt="FollowersImage" className="rightBarFollowingImage" />
            <span className="rightBarFollowingName">{friend.username}</span>
          </div>
          </Link>
          ))
        }    
      </div> 



      


      </>
    )
  }


  return (
    <Fragment>
        {
            user ?
    <div className='rightBar1' style={{marginTop:'9px'}}>
        <div className="rightBarWrapper1">
         
            <ProfilePage/>

            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
     <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2"> Edit the profile Details</Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                <TextField
                    label="username"
                    name='username'
                    id="username"
                    value={editProfile.username}
                    onChange={handleChange}
                    type='text'
                    variant="standard" />

                    <TextField
                    label="email"
                    name='email'
                    value={editProfile.email}
                    onChange={handleChange}
                    id="email"
                    type='email'
                    variant="standard" />

                    <TextField
                    label="phone"
                    name='phone'
                    value={editProfile.phone}
                    onChange={handleChange}
                    id="phone"
                    type='text'
                    variant="standard" />

                    <TextField
                    label="city"
                    name='city'
                    value={editProfile.city}
                    onChange={handleChange}
                    id="city"
                    type='text'
                    variant="standard" />

                    <TextField
                    label="from"
                    name='from'
                    value={editProfile.from}
                    onChange={handleChange}
                    id="from"
                    type='text'
                    variant="standard" />

                    <TextField
                    label="relationship"
                    name='relationship'
                    value={editProfile.relationship}
                    onChange={handleChange}
                    id="relationship"
                    type='text'
                    variant="standard" />

                </FormControl>
                <br />
                <br />
                <Grid className='flex justify-evenly' >
                    <Button onClick={handleONSubmit} variant="contained" className='mr-2' color="success">submit</Button>
                    <Button variant="contained" onClick={handleClose}  color="error">Close</Button>
                </Grid>
            </Typography>
        </Box>
      </Modal>
        
        </div>
    </div>
    :
       <div className='rightBar' style={{marginTop:'70px'}}>
       <div className="rightBarWrapper">
           <HomeRightBar className='hidden md:block'/>
        
       </div>
   </div>
  }
   </Fragment>
  )
}

export default RightBar