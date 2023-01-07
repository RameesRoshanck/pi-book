// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { userChat } from '../../api/ChatApi';
import { UserAuthContext } from '../../Context/UserContext';
import ChatBox from '../chatbox/ChatBox';
import Conversation from '../Conversation/Conversation';
import './chat.css';

function Chat() {

    const [chat,setChat]=useState([])
    const [curentChat,setCurentChat]=useState(null)
    const {authUser,setAuthUser}=useContext(UserAuthContext)

    useEffect(()=>{
         const getChat=async()=>{ 
          try{
            const res=await userChat(authUser._id)
            setChat(res.data) 
          }catch(error){
            console.log(error,'getChat');
          }
         
         }
         getChat()
    },[authUser])

  return (
      <div className="Chat">
        <div className="Left-side-chat ">
          <div className="Chat-container">
            <h2>Chat</h2>
            <div className="Chat-list">
              {
               chat.map((chats)=>{
                return(
                  <div onClick={()=>setCurentChat(chats)} > 
                  <Conversation key={chats._id} data={chats} currentUserId={authUser._id} />
                  </div>
                ) 
              })
              }
            </div>
          </div>  
        </div>
        <div className="Right-side-chat">
          <div style={{width:"20rem",alignSelf:"flex-end"}}> </div>
            <ChatBox chat={curentChat} curentUserId={authUser._id} />
          
        </div>
      </div>
  )
}

export default Chat