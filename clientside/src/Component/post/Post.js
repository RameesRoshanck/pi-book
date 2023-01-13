import React from 'react'
import './post.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ShareIcon from '@mui/icons-material/Share';


function Post() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='post' >
        <div className="postWrapper">
            <div className="share-top">
              <img src={PF+"sampleImg/noAvatar.jpg"} alt="images" className='postProfielImg'/>
              <input  type="text" placeholder={"What's in your mind"} className="postInput"  />
            </div>
          <hr className='posthr' />
            <form  className="share-bottom">
              <label htmlFor='file'  className="shareOption">
                <AddAPhotoIcon  htmlColor="tomato" className='shareIcons'/>
                <span className='shareOptionText' >photos</span>
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