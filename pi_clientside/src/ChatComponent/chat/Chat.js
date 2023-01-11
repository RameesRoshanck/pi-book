// import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { userChat } from '../../api/ChatApi';
import { UserAuthContext } from '../../Context/UserContext';
import ChatBox from '../chatbox/ChatBox';
import Conversation from '../Conversation/Conversation';
import './chat.css';
const { io } = require("socket.io-client");

function Chat() {
  const socket = useRef()
  const {authUser,setAuthUser}=useContext(UserAuthContext)

    const [chat,setChat]=useState([])
    const [curentChat,setCurentChat]=useState(null)
    const [onlineUsers,setOnlineUsers]=useState([])
    const [sendMessages,setSendMessages]=useState(null)
    const [receiveMessage,setReceiveMessage]=useState(null)

     // Get the chat in chat section
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
    },[authUser._id])


      //receive message from socket server
    
    useEffect(()=>{
      socket.current=io("http://localhost:8800");
      socket.current.emit("new-user-data",authUser._id)
      socket.current.on("get-users",(users)=>{
        setOnlineUsers(users)
        // console.log(onlineUsers,'onlineusers');
      })
    },[authUser])


    //send message to the socket server
    useEffect(()=>{
        if(sendMessages !== null){
          socket.current.emit("send-messages",sendMessages)
        } 
    },[sendMessages])


    useEffect(()=>{
      socket.current.on("receive-message",(data)=>{
        console.log(data,'data received in parent ')
        setReceiveMessage(data)
      })
    },[])
    

    const checkonlineStatus=async(chat)=>{
      // const chatMembers=await chat.members.find((member)=> member)
       const chatMember=await chat.members.find((member)=> member !== authUser._id)
       console.log(chatMember,'798765465123');
       const online=onlineUsers.find((user) => user.userId === chatMember)
       return online?true:false
    }

  return (
      <div className="Chat">
        <div className="Left-side-chat ">
          <div className="Chat-container">
            <h2>Chat</h2>
            <div className="Chat-list">
              {
               chat.map((chats)=>{
                return(
                  <div  onClick={()=>setCurentChat(chats)} > 
                  <Conversation   data={chats} currentUserId={authUser._id}
                  online={checkonlineStatus(chat)} />
                  </div>
                ) 
              })
              }
            </div>
          </div>  
        </div>
        <div className="Right-side-chat">
          <div style={{width:"20rem",alignSelf:"flex-end"}}> </div>
            <ChatBox chat={curentChat} curentUserId={authUser._id} 
            setSendMessages={setSendMessages} receiveMessage={receiveMessage} />
          
        </div>
      </div>
  )
}

export default Chat