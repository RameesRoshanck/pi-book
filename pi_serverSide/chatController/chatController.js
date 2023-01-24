
const chatModel=require('../models/ChatModel')

const createChat =async(req,res)=>{
    // console.log(req.body,'req.body in create chat');
        const newChat=await new chatModel({
            members:[req.body.senderId,req.body.receverId] 
        })
   try{
    // console.log(newChat,'new chat');
         const result=await newChat.save()
         return res.status(200).json(result)
    }catch(error){
        console.log(error,'createchat');
    }
}

const userChat =async(req,res)=>{
    // console.log(req.params);
    try{
      const chat=await chatModel.find({
        members:{$in:[req.params.userId]}
      })
      return res.status(200).json(chat)
    }catch(error){
        console.log(error,'userChat');
    }
}

const findchat =async(req,res)=>{
     try{
         const chat=await chatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
         })
         return res.status(200).json(chat)
     }catch(error){
        console.log(error,'findchat');
     }
}

module.exports={
    createChat,
    userChat,
    findchat


}