import React, { useEffect, useRef, useState } from 'react'
import './chatbox.css'
import { addMessage, getMessages, getUser } from '../../api/ChatApi';
import { format} from 'timeago.js';
import InputEmoji from "react-input-emoji";

function ChatBox({chat,curentUserId,setSendMessages,receiveMessage}) {

    const [userData,setUserData]=useState(null)
    const [messages,setMessages]=useState([])
    const [text,setText]=useState("")
    const [newMessages,setNewMessages]=useState("")
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    const handleChange=(newMessages)=>{
      setNewMessages(newMessages)
    }


     // fetching  data for header
     useEffect(()=>{
      const userId=chat?.members?.find((id)=>id !==curentUserId);
      const getUserData = async () => {
        try {
          const { data } = await getUser(userId);
          setUserData(data);
          // console.log(data,"get user data");
        } catch (error) {
          console.log(error, "get user data");
        }
      }
      if(chat!==null){
        getUserData()   
      }
  },[chat,curentUserId])


  //fetch messages
  useEffect(()=>{
    const fetchMessages=async()=>{
      try{
          const {data}=await getMessages(chat._id)
          setMessages(data)
          // console.log(data);
      }catch(error){
        console.log(error,'fetchMessages');
      }
    }
    if(chat!==null){
      fetchMessages()
    }
  },[chat])


     //always scroll to  last message
     useEffect(()=>{
      scroll.current?.scrollIntoView({behavior:"smooth"})
     },[messages])

      

     // Send Message
     const handleSend=async(e)=>{
      e.preventDefault()
      const message={ 
       senderId:curentUserId,
       text:newMessages,
       chatId:chat._id
      }
         //send message to soket server
     const receiverId=chat.members.find((id)=>id !== curentUserId);
     setSendMessages({...message,receiverId})
     try{
          const {data}=await addMessage(message)
          setMessages([...messages,data])
          setNewMessages("")
     }catch(error){
       console.log(error,'handel send');
     }
   }
  
    
   // Receive Message from parent component
    useEffect(()=>{
      console.log("Message Arrived: ", receiveMessage)
      if(receiveMessage !== null && receiveMessage.chatId === chat._id){
        console.log(receiveMessage,'data received in child in  chat box');
        setMessages([...messages,receiveMessage])
      }
    },[receiveMessage])
    

    // const handleOnEnter=(text)=>{
    //   setText(text)
    // }


   
    const scroll=useRef()

 

   

  return (
    <>
    <div className="ChatBox-container">
      {
        chat ?
        <>
      <div className="chat-header" style={{zIndex:"1"}}>
        <div className="chatbox-followers">

        </div>
        <div className="followerConversationHeader flex" style={{zIndex:"1",backgroundColor:'black',color:'white'}}>
            <img src={userData?.profilePicture? PF+userData?.profilePicture: PF+"sampleImg/noAvatar.jpg"}
            alt="img" style={{width:"50px",height:"50px"}} className='py-1 mx-2 '  />
            <div className="name py-3 mx-2" style={{ fontSize: "0.8rem" }}>
              <span>{userData?.username}</span>
            </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec"}} />
      </div>
       <div className="chat-body" >
         {
          messages.map((message)=>(
            <>
               <div ref={scroll}
                    className={
                      message.senderId === curentUserId
                        ? "message own"
                        : "message"
                    }
                  >
              <span>{message.text}</span>{" "}
              <span>{format(message.createdAt)}</span>
            </div>
            </>
          ))
         }
       </div>
       <div className="chat-sender">
        <div>+</div>
        <InputEmoji
         value={newMessages}
         onChange={handleChange}
         cleanOnEnter
         placeholder="Type a message"
        />
        <div className="send-button button cursor-pointer" onClick={handleSend}>
         Send
        </div>
       </div>
      </>
      :
      <span className='chatbox-empty-message'>
        Top on a chat to start Conversation
      </span>
      }
      
    </div>
    </>
  )
}

export default ChatBox