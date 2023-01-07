import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/ChatApi';

function ChatBox({chat,curentUserId}) {

    const [userData,setUserData]=useState(null)
    const [messages,setMessages]=useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   
    useEffect(()=>{
        const userId=chat?.members?.find((id)=>id!==curentUserId);
        const getUserData = async () => {
          try {
            const { data } = await getUser(userId);
            setUserData(data);
            console.log(data);
          } catch (error) {
            console.log(error, "get user data");
          }
        };
        if(chat!==null){
          getUserData()   
        }
    },[chat,curentUserId])


    useEffect(()=>{
      const fetchMessages=async()=>{
        try{
            const {data}=await getMessages(chat._id)
            setMessages(data)
            console.log(data);
        }catch(error){
          console.log(error,'fetchMessages');
        }
      }
      if(chat!==null){
        fetchMessages()
      }
    },[])



  return (
    <>
    <div className="ChatBox-container">
      <>
      <div className="chat-header">
        <div className="chatbox-followers">

        </div>
        <div className="followerConversationHeader  flex">
            <img src={userData?.profilePicture? PF+userData?.profilePicture: PF+"sampleImg/noAvatar.jpg"}
            alt="img" style={{width:"50px",height:"50px"}} className='py-1 mx-2 '  />
            <div className="name py-3 mx-2" style={{ fontSize: "0.8rem" }}>
              <span>{userData?.username}</span>
            </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
      </div>
       <div className="chat-body">

       </div>
      </>
    </div>
    </>
  )
}

export default ChatBox