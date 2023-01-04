import React, { Fragment, useEffect, useState } from 'react'
import Getpost from '../Getpost/Getpost'
import Post from '../Post/Post'
import Status from '../status/Status'
import './feed.css'
// import {Posts} from '../../Dummydata'
import axios from 'axios'


function Feed({userStatus,username}) {
// console.log(Posts,'feed posts');
      const [post,setPost]=useState([])
        // console.log(username,'.......');
      useEffect(()=>{
      let fetchPost=async()=>{
        let res=username ?
        await axios.get("/profile/"+username)
        :
        await axios.get("/getTimeline/63ad765b0a0ecda115fed9ab")
        setPost(res.data)
        // console.log(res.data);
        // console.log(username);
       }
       fetchPost()
      },[username])

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