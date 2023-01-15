import React, { useContext, useRef, useState } from 'react'
import './post.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ShareIcon from '@mui/icons-material/Share';
import { UserAuthContext } from '../../redux/AuthContext';
import axios from 'axios';


function Post() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const {authUser}=useContext(UserAuthContext)
    const [file,setFile]=useState(null)
    const desc=useRef()

    const handleSubmit=async(e)=>{
      e.preventDefault()
      const newPost={
        userId:authUser._id,
        desc:desc.current.value
      }
      if(file){
        const data=new FormData()
        const FileName=file.name;
        data.append("file",file)
        data.append("name",FileName)
        newPost.img=FileName
        try{
           await axios.put("http://localhost:8000/upload",data)
        }catch(err){
          console.log(err,'err post component');
        }
      }
      try{
       await axios.put("http://localhost:8000/addpost",newPost)
       window.location.reload()
      }catch(error){
        console.log(error,'error in post component');
      }
    }


  return (
    <div className='post' >
        <div className="postWrapper">
            <div className="share-top">
              <img src={authUser.profilePicture? PF +authUser.profilePicture : PF +"sampleImg/noAvatar.jpg"} alt="images" className='postProfielImg'/>
              <input ref={desc} type="text" placeholder={"What's in your mind"+" "+authUser.username +" "+"?"} className="postInput"  />
            </div>
          <hr className='posthr' />
            <form  className="share-bottom" onSubmit={handleSubmit} >  
              <label htmlFor='file'  className="shareOption">
                <AddAPhotoIcon  htmlColor="tomato" className='shareIcons'/>
                <span className='shareOptionText' >photos</span>
                <input style={{display:"none"}} type='file' id='file' name='file' accept=".png,.jpeg,.jpg" onChange={(e)=>{setFile(e.target.files[0])}}/>
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