const User=require('../models/user')

//update user details
const updateUser=(req,res)=>{

}

//delete userAccounte


//get a user
const getSingleUser=async(req,res)=>{
    try{
        // let id=req.params.id
        // console.log(req.query);
        const userId=req.query.userId
        const userName=req.query.username
        // console.log(userName,'dsf');
        // console.log(userId,'wer');
        let users=userId ?
         await User.findById({_id:userId})
         :
         await User.findOne({username:userName})
        //remove unnessary items(eg:password,updated at,etc.....)
        const {password,updatedAt,__v,...user}=users._doc
        return res.status(200).json({user})
    }catch(error){
        console.log(error,'getSingleUser');
    }
}

//get the all users 
const allUsers=async(req,res)=>{
   try{
    let user=await User.find()
    return res.status(200).json(user)
   }catch(error){
    console.log(error,'get all users');
   }

}

//get the all friends

const getFriends=async(req,res)=>{
  try{
    let id=req.params.id
    let user=await User.findById(id)
    let friends=await Promise.all(
      user.followings.map((followerId)=>{
        return User.findById(followerId)
      })
    )
    let friendList=[];
    friends.map((friend)=>{
      friendList.push(friend)
    })
    return res.status(200).json(friendList)
  }catch(error){
    console.log(error,'getFriends');
  }
}


//follow a user
const followUser=async(req,res)=>{
    console.log('hai');
  try{
      let paramsId=req.params.id
      let userId=req.body.userId
    //   console.log(paramsId,userId,'params id and user id');
      if(userId !== paramsId){
        let user=await User.findById(paramsId)
        let currentUser=await User.findById(userId)
        if(!user.followers.includes(userId)){
            await user.updateOne({$push:{followers:userId}})
            await currentUser.updateOne({$push:{followings:paramsId}})
            return res.status(200).json({message:"user has been followed"})
        }else{
            return res.status(403).json({message:"you already follow this user"})
        }
      }else{
        return res.status(403).json({message:"you can't follow yourself"})
      }

  }catch(error){
    console.log(error,'followUser')
  }
}

//unfollow user
const unFollowUser=async(req,res)=>{
    console.log('hai');
  try{
      let paramsId=req.params.id
      let userId=req.body.userId
    //   console.log(paramsId,userId,'params id and user id');
      if(userId !== paramsId){
        let user=await User.findById(paramsId)
        let currentUser=await User.findById(userId)
        if(user.followers.includes(userId)){
            await user.updateOne({$pull:{followers:userId}})
            await currentUser.updateOne({$pull:{followings:paramsId}})
            return res.status(200).json({message:"user has been Unfollowed"})
        }else{
            return res.status(403).json({message:"you already unfollow this user"})
        }
      }else{
        return res.status(403).json({message:"you can't unfollow yourself"})
      }

  }catch(error){
    console.log(error,'followUser')
  }
}

//get a user with  prams id
const getAUser=async(req,res)=>{
   let id=req.params.id
   try{
     let user=await User.findById(id)
     if(user){
      const{password,...userDatails}=user._doc
      return res.status(200).json(userDatails)
     }else
     return res.json({message:"not user found"})
   }catch(error){
    console.log(error,'get A user');
   }
}


module.exports={
    updateUser,
    allUsers,
    getFriends,
    getSingleUser,
    followUser,
    unFollowUser,
    getAUser
}