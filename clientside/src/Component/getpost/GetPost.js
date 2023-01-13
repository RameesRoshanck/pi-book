import React, { useState } from 'react'
import './getpost.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

function GetPost() {
    const[open,setOpen]=useState(false)

    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    console.log(PF,'pf for get post');
  return (
    <div className='getpost'>
        <div className="getPostWrapper">
            <div className="getPostTop">
                <div className="postTopLeft">
                    <img src={ PF+"sampleImg/noAvatar.jpg" } alt="images" className='getPostProfielImg'/>

                    <div>
                        <p className='postUserName' >mohamed ramess</p>
                        {/* <p className="postDate pl-2">{format(post.createdAt)}</p> */}
                    </div>
                </div>
                <div className="postTopRight">
                  <MoreVertIcon/>
                </div>
            </div>
            <div className="getPostCenter my-2">
                <span className="postText">post</span>
                <img src='hai' alt="images" className='post-image mt-2'/>
            </div>
            <div className="getPostBottom mt-7">
                <div className="postbottomLeft p-2 flex justify-between">
                    <div className='text-center'>
                    <ThumbUpIcon htmlColor='#9e9e9e'  className='likebutton' />
                    <span className='postLikeCouter'>people liked it</span>
                    </div>
                    <div>
                    <ChatBubbleOutlineIcon htmlColor="green"  className='likebutton' />
                    <span onClick={(e)=>setOpen(!open)} className='postLikeCouter'> comments</span>
                    </div>
                    <div>
                    <ShareIcon htmlColor='tomato' className='likebutton' />
                    <span className='postLikeCouter'>Share</span>
                    </div>
                </div>
                <hr className='posthr' />
             { open ?
                <div>
                <div className="postbottomComment">
                
                    <div className='Comment flex my-3'>
                        <img src='img' alt="images" className='cmmnt-img'/>
                        <div>
                            <p className='postUserName' >mohamed Ramees ck</p>
                            <p className="postDate pl-2">5 min ago</p>
                        </div>
                         <p className='text-cmd'>hai how are you</p>
                    </div>
                    <div className='Comment flex my-3'>
                        <img src='img' alt="images" className='cmmnt-img'/>
                        <div>
                            <p className='postUserName' >mohamed Ramees ck</p>
                            <p className="postDate pl-2">5 min ago</p>
                        </div>
                         <p className='text-cmd'>hai how are you</p>
                    </div>
                    <div className='Comment flex my-3 '>
                        <img src='img' alt="images" className='cmmnt-img'/>
                        <div>
                            <p className='postUserName' >mohamed Ramees ck</p>
                            <p className="postDate pl-2">5 min ago</p>
                        </div>
                         <p className='text-cmd'>hai how are you</p>
                    </div>
                   
                </div>
                <div className='flex mt-5 userComment'>
                        <input placeholder='write the comment' type="text" className='comments' />
                        <Button variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </div>
                </div>
              : "" 
              }
            </div>
        </div>
    </div>
  )
}

export default GetPost