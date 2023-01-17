import React, { useContext, useEffect, useRef, useState } from "react";
import { userChat } from "../../Api/ChatRequest";
import { UserAuthContext } from "../../redux/AuthContext";
import ChatBox from "../ChatBox/ChatBox";
import Conversation from "../Conversation/Conversation";
import "./chat.css";
import { io } from "socket.io-client";

function Chat() {
  const { authUser } = useContext(UserAuthContext);
  const socket = useRef();

  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [curentChat, setCurentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);




    // Connect to Socket.io
    useEffect(() => {
      socket.current = io("http://localhost:8800")
      socket.current.emit("new-user-add", authUser._id)
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
        // console.log(onlineUsers,'onlineusers');
      });
    }, [authUser]);


    //sending message from socket server
    useEffect(() => {
      console.log(sendMessage,'sendmessage');
      if (sendMessage !== null) {
        socket.current.emit("send-messages", sendMessage);
      }
    }, [sendMessage]);

 
  //receive massage from socket server
  useEffect(() => {
    console.log('chat recieve useeffect');
    socket.current.on("recieve-message",(data) => {
      console.log(data,'chat-recivemessage');
      setRecieveMessage(data);
    });
  }, []);




  // Get the chat in chat section
  useEffect(() => {
    let getChat = async () => {
      try {
        const { data } = await userChat(authUser._id);
        setChat(data);
        //  console.log(data);
      } catch (error) {
        console.log(error, "get chat");
      }
    };
    getChat();
  }, [authUser]);












  const checkonlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== authUser._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };



  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chat.map((chats) => {
              return (
                <div key={chats._id} onClick={() => setCurentChat(chats)}>
                  <Conversation
                    data={chats}
                    CurrentUserId={authUser._id}
                    online={checkonlineStatus(chats)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}> </div>
        <ChatBox
          chat={curentChat}
          CurrentUserId={authUser._id}
          setSendMessage={setSendMessage}
          recieveMessage={recieveMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
