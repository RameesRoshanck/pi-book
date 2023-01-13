import React, { Fragment,useEffect, useState } from 'react'
import './rightbar.css'
import image from '../../assets/elonmask.jpeg'
import Button from '@mui/material/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { UserAuthContext } from '../../Context/UserContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Rightbar({user}) {
 
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [friend,setFriend]=useState([])
  // const {authUser,setAuthUser}=useContext(UserAuthContext)
  // const [followed,setFollowed]=useState(authUser.followings.includes(user?.id))
  // console.log(user,"suergfdsgsdfgdsfg");

  // useEffect(()=>{
  //     setFollowed(authUser.followings.includes(user._id))
  // },[authUser,user._id])
  // console.log(followed,'followed==================================++++++');

  useEffect(()=>{
   const getFriends=async ()=>{
      // try{
      //   let res=await axios.get("http://localhost:8000/getFriends/"+user._id)
      //   // console.log(res.data,'rightbar');
      //   setFriend(res.data)
      // }catch(error){
      //   console.log(error,'rightbar');
      // }
   }
   getFriends()
  },[user])

  const handleClick=async(e)=>{
    e.preventDefault()
    // try{
    //   if(followed){
    //     await axios.put("http://localhost:8000/followUser/"+user._id+"/follow",{userId:authUser._id})
    //   }else{
    //     await axios.put("http://localhost:8000/unfollowUser/"+user._id+"/unfollow",{userId:authUser._id})
    //   }
    //   setFollowed(!followed)
    // }catch(error){
    //   console.log(error,'handle click in right bar');
    // }
  }


  // console.log(authUser,'user');

  const HomeRightBar=()=>{
    return(
     <div className="HomeRightBar">
        <h4 className="rightBarTitle ">Online Friends</h4>
           <hr className='posthr' />
            <ul className="rightBarFriendsList">
               <li className="rightbarFriends">
                 <div className="rightbarProfileImageContainer">
                  <img src={image} alt="img" className='rightBarProfileImg' />
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
      {/* {
        user.username !==authUser.username && (
          <button className='rightBarFollowButton' onClick={handleClick} >
            {followed ? "Unfollow":"follow"}
            {followed ? <RemoveIcon/>:<AddIcon/>}
          </button>
        )
      } */}
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
          friend.map((data)=>{
            return(
              <Link to={"/profile/"+data.username} >
              <div className="rightBarFollowing">
              <img src={data.profilePicture? PF+data.profilePicture : PF+"sampleImg/noAvatar.jpg"} alt="FollowersImage" className="rightBarFollowingImage" />
              <span className="rightBarFollowingName">{data.username}</span>
            </div>
            </Link>
            )
          })
        }
      </div> 
      </>
    )
  }


  return (
    <Fragment>
        {
            user?
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

export default Rightbar