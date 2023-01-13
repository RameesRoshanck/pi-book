import React, { Fragment, useEffect, useState } from 'react'
import GetPost from '../getpost/GetPost'
import Post from '../post/Post'
import './feed.css'
import axios from 'axios'

function Feed({username}) {

  const [posts,setPosts]=useState([])
 
    useEffect(()=>{
      let fetchPost=async()=>{
          let res=username?
           await axios.get("http://localhost:8000/profile/"+username)
          : await axios.get("http://localhost:8000/getTimeline/63ad765b0a0ecda115fed9ab")
          setPosts(res.data);
       }
       fetchPost()
    },[username])

  return (


    <Fragment>

    <div className='feed'>
        <div className="feedWrapper">
        <Post/>
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