const Post=require('../models/userPost')
const User=require ('../models/user')



//create post
const addPost=async(req,res)=>{
    try{
        // console.log(req.body);
         const post=await new Post(req.body)
        await post.save()     
        return res.status(200).json({message:"successfully insert the post"})

    }catch(error){
        console.log(error,'addpost');
    }
}


//update post
const updatePost=async(req,res)=>{
    try{
        const desc=req.body.desc
        const postId=req.params.id
        let post=await Post.findOne({postId})
        if(post.userId===req.body.userId){
            // console.log(post,'post details');
            if(!desc){
                return res.json({message:"The post couldn't update"}) 
            }else{
                await Post.updateOne({_id:postId},
                    {
                        $set:{desc:desc}
                    })
                    return res.status(200).json({message:"your post successfully updated"}) 
                }
            }else{
                return res.json({message:"you can update onlly your post"})
            } 
    }catch(error){
        console.log(error,'updatePost');
    }
}


//delete the post
const deletePost=async(req,res)=>{
    try{
        const postId=req.params.id
        let post=await Post.findById(postId)
        if(post.userId===req.body.userId){
            await Post.deleteOne()
            return res.status(200).json({message:"your post successfully Deleted"}) 
            }else{
                return res.json({message:"you can Delete onlly your post"})
            } 
    }catch(error){
        console.log(error,'updatePost');
    }
}


//like and dislike a post
const likePost=async(req,res)=>{
    try{
        let postId=req.params.id
        let userId=req.body.userId
        console.log(req.params.id,req.body.userId);
        let post=await Post.findById(postId)
        console.log(post,'post');
        if(!post.like.includes(userId)){
            await Post.updateOne({$push:{like:userId}})
            return res.status(200).json({message:"your post has been liked"}) 
        }else{
            await post.updateOne({$pull:{like:userId}})
            return res.status(200).json({message:"your post has been Unliked"}) 
        }
    }catch(error){
        console.log(error,'likePost');
    }
}


//get a post
const getPost=async(req,res)=>{
    try{
        let PostId=req.params.id
        let post=await Post.findById(PostId).populate('userId')
        // console.log(post);
        return res.status(200).json({message:"get sigle post successfully",post}) 
    }catch(error){
        console.log(error,'getPost');
    }

}

//get timeline users post
const getTimeLine=async(req,res)=>{
      try{
        let userid=req.params.userId
         let currentUser=await User.findById(userid)
        //  console.log(currentUser,'hai time line curent user');
         let userPost=await Post.find({userId:currentUser._id})
         let FriendsPost=await Promise.all(
            currentUser.followings.map((dataId)=>{
                return(Post.find({userId:dataId}))
            })
         )
         return res.status(200).json(userPost.concat(...FriendsPost))
      }catch(error){
        console.log(error,'gettime line');
      }
}

//get user all post

const getAllPost=async(req,res)=>{
    let userName=req.params.username
    try{
       let user=await User.findOne({username:userName})
       let post=await Post.find({userId:user._id})
       return res.status(200).json(post)
    }catch(error){
        console.log(error,'getAllPost');
    }

}


//add comment
const addComment=async(req,res)=>{
    try{
       const {userId,desc}=req.body
       const id=req.params.id
          let comment={
               userId:userId,
               desc:desc,
               postId:id
          }

       let addCmd=await Post.findByIdAndUpdate({_id:id},
        {
          $push:{comments:comment}
        })
        console.log(addCmd,'....................');
        res.json(addCmd)
    }catch(error){
        console.log(error,'add comment');
    }
}

//get comment

const getComment=async(req,res)=>{
    // console.log(req.params.id);
    try{
        let id=req.params.id
          let findComment=await Post.findOne({postId:id}).populate("comments.userId")
        //   const {like,video,img,password,updatedAt,__v,...user}=findComment._doc
        //   console.log(findComment);
          return res.json(findComment)
    }catch(error){
        console.log(error,'get comment');
    }
}


module.exports={
    addPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getTimeLine,
    getAllPost,
    addComment,
    getComment
}