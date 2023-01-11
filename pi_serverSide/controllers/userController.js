const User=require('../models/user')
const bcrypt = require('bcrypt');

//update user details
const updateUser=async(req,res)=>{
    
  try{
     let id=re.params.id
     if(req.body.password){
      try{
        req.body.password= await bcrypt.compare(req.body.password,10)
      }catch(error){
       console.log(error);
      }
     } 
     try{
      const update=await User.findByIdAndUpdate(id,{
        $set:req.body
      });
      return res.json({message:"Account has been updated"})
     }catch(error){
      console.log(error);
     } 
  }catch(error){
    console.log(error,"updateuser");
  }
}

//delete userAccounte
const deleteAccount=async(req,res)=>{
  let id=req.params.id
  try{
       let deleteUser=await User.findByIdAndDelete(id)
       return res.json({message:"successfully deleted"})
  }catch(error){
    console.log(error);
  }
}

//get a user
const getSingleUser=async(req,res)=>{
    try{
        // console.log(req.query,'query');
        const userId=req.query.userId
        // const userName=req.query.username
        // console.log(userName,'=======================');
        let users=await User.findById({_id:userId})
        // userId ?  :
        //  await User.findOne({username:userName})
        //remove unnessary items(eg:password,updated at,etc.....)
        // console.log(users,'users');
        // const {password,updatedAt,__v,...user}=users._doc
        return res.status(200).json(users)
    }catch(error){
        console.log(error,'getSingleUser');
    }
}


/* ------------------------ // get getSingleUserName ------------------------ */
const getSingleUserName=async(req,res)=>{
  try{
    const userName=req.params.id
    // console.log(req.params,'query');
      // console.log(userName,'=======================');
      let users=await User.findOne({username:userName})
      // console.log(users,'getSingleUserName');
      return res.status(200).json(users)
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
    console.log(id,'get friends');
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
    getAUser,
    deleteAccount,
    getSingleUserName
}