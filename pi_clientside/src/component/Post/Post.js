import React,{useContext, useRef, useState} from 'react'
import './post.css'
import image from '../../assets/elonmask.jpeg'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ShareIcon from '@mui/icons-material/Share';
import { UserAuthContext } from '../../Context/UserContext';


function Post() {
  
  const {authUser,setAuthUser}=useContext(UserAuthContext)
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const desc=useRef()
  const[files,setFiles]=useState(null)

  const handleSubmit=(e)=>{
      e.preventDefault()
      const newPost={
        userId:authUser._id,
        desc:desc.current.value
      }
  }

  return (
    <div className='post' >
        <div className="postWrapper">
            <div className="share-top">
              <img src={authUser.profilePicture? PF+authUser.profilePicture : PF+"sampleImg/noAvatar.jpg"} alt="images" className='postProfielImg'/>
              <input ref={desc} type="text" placeholder={"What's in your mind"+" "+authUser.username +"?"} className="postInput"  />
            </div>
          <hr className='posthr' />
            <form  className="share-bottom" onSubmit={handleSubmit}>
              <label htmlFor='file'  className="shareOption">
                <AddAPhotoIcon  htmlColor="tomato" className='shareIcons'/>
                <span className='shareOptionText' >photos</span>
                <input style={{display:"none"}} type="file" id='file' accept=".png,.jpeg,.jpg" onChange={(e)=>{setFiles(e.target.files[0])}}/>
              </label>
              <div className="shareOption">
                <PermMediaIcon htmlColor="green" className='shareIcons'/>
                <span className='shareOptionText' >videos</span>
              </div>
              <div className="shareOption">  
                <button type='submit' className='ShareButton' ><ShareIcon htmlColor="blue" className='shareIcons'/>Share</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Post