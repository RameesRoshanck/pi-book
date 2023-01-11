import React, { Fragment, useContext, useEffect, useState } from 'react'
import Getpost from '../Getpost/Getpost'
import Post from '../Post/Post'
import './feed.css'
import axios from 'axios'
import { UserAuthContext } from '../../Context/UserContext'




function Feed({username}) {
      const [post,setPost]=useState([])
      const {authUser,setAuthUser}=useContext(UserAuthContext)

  console.log(username,'feed username');
      useEffect(()=>{
      let fetchPost=async()=>{
        let res= username
         ? await axios.get("http://localhost:8000/profile/"+username)
         : await axios.get("/getTimeline/"+authUser._id)
        setPost(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        }))
       }
       fetchPost()
      },[username,authUser._id])

  return (
    <Fragment>

    <div className='feed'>
        <div className="feedWrapper">
        <Post/>
        {
         post.map((data)=>{
          return(
          <Getpost key={data._id} post={data} /> 
          )
        })
      }
        </div>
    </div>
    
    </Fragment>
    
  )
}

export default Feed