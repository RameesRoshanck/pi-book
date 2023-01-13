import React, { Fragment } from 'react'
import GetPost from '../getpost/GetPost'
import Post from '../post/Post'
import './feed.css'

function Feed() {
  return (
    <Fragment>

    <div className='feed'>
        <div className="feedWrapper">
        <Post/>
        <GetPost/>
        </div>
    </div>
    
    </Fragment>
  )
}

export default Feed