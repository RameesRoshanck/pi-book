import React, { Fragment, useContext, useEffect, useState } from 'react'
import './rightbar.css'
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { UserAuthContext } from '../../redux/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';  

function RightBar({user}) {
  
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends]=useState([])
  const username=useParams().username
  const {authUser}=useContext(UserAuthContext)
  const [followed,setFllowed]=useState(false)


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
   },[])

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


  const HomeRightBar=()=>{
    return(
     <div className="HomeRightBar">
        <h4 className="rightBarTitle ">Online Friends</h4>
           <hr className='posthr' />
            <ul className="rightBarFriendsList">
               <li className="rightbarFriends">
                 <div className="rightbarProfileImageContainer">
                  <img src='img' alt="img" className='rightBarProfileImg' />
                  <span className="rightBarOnline"></span>
                 </div>
                 <span className='rightBarUserName'>Roshan ck</span>
                 <Button className='follows' variant="contained">Follow</Button>
                </li>
            </ul>
      </div>
    )
  }

  const ProfilePage=()=>{
    
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
      <h3 className='profileRightBarTitle' >User Profile:</h3>
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