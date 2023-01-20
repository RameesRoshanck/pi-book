import React, { useContext, useEffect, useState } from "react";
import "./getpost.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../../redux/AuthContext";
import { format } from 'timeago.js';

function GetPost({ post }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [comment, setComment] = useState("");
  const [seeComment,setSeeComment]=useState([])
  const { authUser } = useContext(UserAuthContext);

  const [like, setLike] = useState(post.like.length);
  const [isLike, setIsLike] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;



  useEffect(() => {
    setIsLike(post.like.includes(authUser._id));
  }, [authUser._id, post.like]);



  useEffect(() => {
    let fetchUser = async () => {
      let res = await axios.get(`http://localhost:8000/?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);



  const likehandler = async () => {
    try {
      await axios
        .put("http://localhost:8000/userlike/" + post._id + "/like", {
          userId: authUser._id,
        })
        .then((result) => {
          setLike(result);
        });
    } catch (error) {
      console.log(error, "likeSubmit");
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCmd = {
      userId: authUser._id,
      desc:comment,
    };
    try {
      // console.log(newCmd,'newCmd');
      await axios
        .post("http://localhost:8000/addComment/" + post._id, newCmd)
        .then((res) => {
          // console.log(res.data);
          setComment("");
        });
    } catch (error) {
      console.log(error, "post comment");
    }
  };

  useEffect(()=>{
  let fetchCMD=async()=>{
      let {data}=await axios.get(`http://localhost:8000/getComment/${post._id}`)
      setSeeComment(data.comments)
   }
   fetchCMD ()
  },[])

// console.log(seeComment,'seeComment');
  return (
    <div className="getpost">
      <div className="getPostWrapper">
        <div className="getPostTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "sampleImg/noAvatar.jpg"
                }
                alt="images"
                className="getPostProfielImg"
              />
            </Link>
            <div>
              <p className="postUserName">{user.username}</p>
              <p className="postDate pl-2">{format(post.createdAt)}</p>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="getPostCenter my-2">
          <span className="postText">post</span>
          <img src={PF + post.img} alt="images" className="post-image mt-2" />
        </div>
        <div className="getPostBottom mt-7">
          <div className="postbottomLeft p-2 flex justify-between">
            <div className="text-center">
              <ThumbUpIcon
                htmlColor="#9e9e9e"
                onClick={likehandler}
                className="likebutton"
              />
              <span className="postLikeCouter">{like}people liked it</span>
            </div>
            <div>
              <ChatBubbleOutlineIcon htmlColor="green" className="likebutton" />
              <span onClick={(e) => setOpen(!open)} className="postLikeCouter">
                comments
              </span>
            </div>
            <div>
              <ShareIcon htmlColor="tomato" className="likebutton" />
              <span className="postLikeCouter">Share</span>
            </div>
          </div>
          <hr className="posthr" />
          {open ? (
            <div>
              <div className="postbottomComment">

                {
                  seeComment.map((comments)=>{
                    console.log(comments.userId.username,'comment.userId');
                    return(
                      <div className="Comment flex my-3">
                      <img src={comments.userId?.profilePicture?  PF + comments.userId.profilePicture : PF + "sampleImg/noAvatar.jpg"
                } alt="images" className="cmmnt-img" />
                      <div>
                          <p className="postUserName">{comments.userId.username}</p>
                          <p className="postDate pl-2">{format(comments.createdAt)}</p>
                      </div>
                      <p className="text-cmd">{comments.desc}</p>
                  </div>
                    )
                  })
                }
               

              </div>
              <form className="flex mt-5 userComment" onSubmit={handleSubmit}>
                <input
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  placeholder="write the comment"
                  type="text"
                  className="comments"
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default GetPost;
