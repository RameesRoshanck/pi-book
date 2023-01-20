// import React, { useContext, useState } from 'react'
// import { UserAuthContext } from '../../redux/AuthContext';
// import './comment.css'
// import SendIcon from "@mui/icons-material/Send";
// import Button from "@mui/material/Button";


// function Comment({post}) {

//     const [open, setOpen] = useState(false);
//     const [comment, setComment] = useState("");
//     const [seeComment, setSeeComment] = useState([]);
//     const { authUser } = useContext(UserAuthContext);



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newCmd = {
//           userId: authUser._id,
//           desc:comment,
//         };
//         // try {
//         //   // console.log(newCmd,'newCmd');
//         //   await axios
//         //     .post("http://localhost:8000/addComment/" + post._id, newCmd)
//         //     .then((res) => {
//         //       console.log(res.data);
//         //       setComment("");
//         //     });
//         // } catch (error) {
//         //   console.log(error, "post comment");
//         // }
//       };

//   return (
//     <div>
//          {open ? (
//             <div>
//               <div className="postbottomComment">
//                     <div className="Comment flex my-3">
//                         <img src="img" alt="images" className="cmmnt-img" />
//                         <div>
//                             <p className="postUserName">mohamed Ramees ck</p>
//                             <p className="postDate pl-2">5 min ago</p>
//                         </div>
//                         <p className="text-cmd">{comment.desc}</p>
//                     </div>
//               </div>
//               <form className="flex mt-5 userComment" onSubmit={handleSubmit}>
//                 <input
//                   value={comment}
//                   onChange={(e)=>setComment(e.target.value)}
//                   placeholder="write the comment"
//                   type="text"
//                   className="comments"
//                 />
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   endIcon={<SendIcon />}
//                 >
//                   Send
//                 </Button>
//               </form>
//             </div>
//           ) : (
//             ""
//           )}
//     </div>
//   )
// }

// export default Comment