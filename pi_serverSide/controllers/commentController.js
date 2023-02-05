const Comment=require ("../models/CommentModels")



// const addComment=async(req,res)=>{
//     try{
//        const {userId,desc}=req.body
//        const id=req.params.id
//           let comment=new Comment({
//                userId:userId,
//                desc:desc,
//                postId:id
//           })

//         let comments=await comment.save()
//          return res.json({message:"successfully comment this post",comments})

//     }catch(error){
//         console.log(error,'add comment');
//     }
// }


const getComments=async(req,res)=>{
    // console.log(req.params.id);
    try{
        let id=req.params.id
          let findComment=await Comment.findOne({postId:id}).populate("userId")
        //   console.log(findComment);
          return res.json({comments:findComment})
    }catch(error){
        console.log(error,'get comment');
    }
}

module.exports={
    // addComment,
    getComments
}