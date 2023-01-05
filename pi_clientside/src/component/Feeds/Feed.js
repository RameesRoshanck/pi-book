import React, { Fragment, useContext, useEffect, useState } from 'react'
import Getpost from '../Getpost/Getpost'
import Post from '../Post/Post'
import Status from '../status/Status'
import './feed.css'
// import {Posts} from '../../Dummydata'
import axios from 'axios'
import { UserAuthContext } from '../../Context/UserContext'


function Feed({userStatus,username}) {
// console.log(Posts,'feed posts');
      const [post,setPost]=useState([])
        // console.log(username,'.......');
        const {authUser,setAuthUser}=useContext(UserAuthContext)
//  console.log(authUser,'feeds');

      useEffect(()=>{
      let fetchPost=async()=>{
        let res=username ?
        await axios.get("/profile/"+username)
        :
        await axios.get("/getTimeline/"+authUser._id)
        setPost(res.data)
        // console.log(res.data);
        // console.log(username);
       }
       fetchPost()
      },[username,authUser._id])

  const AddStatus=()=>{
    return(
      <>
       
       <Post/>
       {
        post.map((data)=>{
          return(
          <Getpost key={data.id} post={data} /> 
          )
        })
      }
      </>
    )
  }

  const RemoveStatus=()=>{
    return(
      <>
      <Status/>
      <Post/>
      {
        post.map((data)=>{
          return(
          <Getpost key={data._id} post={data} /> 
          )
        })
      }
      </>
    )
  }

  return (
    <Fragment>
       {
            username?
    <div className='feed1'>
        <div className="feedWrapper1">
            <AddStatus/>
        </div>
    </div>
    :
    <div className='feed'>
        <div className="feedWrapper">
            <RemoveStatus/>  
        </div>
    </div>
     }
          
    </Fragment>
  )
}

export default Feed