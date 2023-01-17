import React, { useEffect, useRef, useState } from "react";
import "./chatBox.css";
import { addMessage, getMessages, getUser } from "../../Api/ChatRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

function ChatBox({ chat, CurrentUserId, setSendMessage, recieveMessage }) {
 
    console.log(chat?._id,'chat')

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const scroll = useRef();
  const imageRef=useRef()

  const handleChange = (newMessages) => {
    setNewMessages(newMessages);
  };


    // Send Message
    const handleSend = async (e) => {
      e.preventDefault();
      const message = {
        senderId: CurrentUserId,
        text: newMessages,
        chatId: chat._id,
      };
      //send message to socket server
      const recieverId = chat.members.find((id) => id !== CurrentUserId);
      setSendMessage({ ...message, recieverId });
      //send message to database
      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessages("");
      } catch (error) {
        console.log(error, "handle send");
      }
    };





   // Receive Message from parent component
   useEffect(() => {
    console.log(recieveMessage,'receivmessage');
     if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      console.log("Message Arrived: ", recieveMessage);
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);



    //Always scroll to the last message
    useEffect(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);



  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== CurrentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error, "get user data");
      }
    };

    if (chat !== null) {
      getUserData();
    }
  }, [chat, CurrentUserId]);



//   fetch messages
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const { data } = await getMessages(chat._id);
  //       console.log(data,'get message');
  //       setMessages(data);
  //     } catch (error) {
  //       console.log(error, "fetchmessages");
  //     }
  //   };
  //   if (chat !== null) fetchMessages();
  // }, [chat]);

    
    
  useEffect(()=>{
    console.log('haaaaaaaaaaaaawu');
     if(chat !== null && chat.members){
      getMessages(chat._id).then(({data})=>{
        setMessages(data)
      })
     }
     console.log(messages,'oooooooooooooooooo');
  },[chat])
  console.log(messages,'kkkkkkkkkkk');







 




  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header" style={{ zIndex: "1" }}>
              <div className="chatbox-followers"></div>
              <div
                className="followerConversationHeader flex"
                style={{
                  zIndex: "1",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <img
                  src={
                    userData?.profilePicture
                      ? PF + userData?.profilePicture
                      : PF + "sampleImg/noAvatar.jpg"
                  }
                  alt="img"
                  style={{ width: "50px", height: "50px" }}
                  className="py-1 mx-2 "
                />
                <div className="name py-3 mx-2" style={{ fontSize: "0.8rem" }}>
                  <span>{userData?.username}</span>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            {/* //chatbox message */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === CurrentUserId
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}   
            </div>
            <div className="Chat-senter">
              <div onClick={()=>imageRef.current.click()} >+</div>
              <InputEmoji
                value={newMessages}
                onChange={handleChange}
                cleanOnEnter
                placeholder="Type a message"
              />
              <div
                className="send-button button cursor-pointer"
                onClick={handleSend}
              >
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Top on a chat to start Conversation
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
