import React, { Fragment, useContext, useEffect, useState } from 'react'
import GetPost from '../getpost/GetPost'
import Post from '../post/Post'
import './feed.css'
import axios from 'axios'
import { UserAuthContext } from '../../redux/AuthContext'

function Feed({username}) {

  const [posts,setPosts]=useState([])
  const {authUser}=useContext(UserAuthContext)
 
    useEffect(()=>{
      let fetchPost=async()=>{
          let res=username?
           await axios.get("http://localhost:8000/profile/"+username)
          : await axios.get("http://localhost:8000/getTimeline/"+authUser._id)
          setPosts(res.data.sort((p1,p2)=>{
            return new Date(p2.createdAt)- new Date(p1.createdAt)
          }));
       }
       fetchPost()
    },[username,authUser._id])


  return (
 <Fragment>

    <div className='feed'>
        <div className="feedWrapper">
        {(!username || username === authUser.username) && <Post/>}
          {/* <Post/> */}
        {
          posts.map((Post)=>{
            return(
              <GetPost key={Post._id} post={Post}/>
            )
          })
        }
        </div>
    </div>
    
    </Fragment>
  )
}

export default Feed