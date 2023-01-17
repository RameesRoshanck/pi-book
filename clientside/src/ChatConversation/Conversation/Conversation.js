import React, { useEffect, useState } from "react";
import { getUser } from "../../Api/ChatRequest";
import "./conversation.css";

function Conversation({ data, CurrentUserId, online }) {

  const [userData, setUserData] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    
    const userId = data.members.find((id) => id !== CurrentUserId);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error, "get user data");
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="followerConversation  hover:bg-sky-600">
        <div className="followerConversationHeader  flex">
          {online && <div className="online_dot"> </div>}

          <img
            src={
              userData?.profilePicture
                ? PF + userData?.profilePicture
                : PF + "sampleImg/noAvatar.jpg"
            }
            alt=""
            style={{ width: "50px", height: "50px" }}
            className="py-1 mx-2"
          />
          <div className="name py-1 mx-2" style={{ fontSize: "0.8rem" }}>
            <span>{userData?.username}</span>
            <br />
            <span>{online ? "online" : "offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
}

export default Conversation;
