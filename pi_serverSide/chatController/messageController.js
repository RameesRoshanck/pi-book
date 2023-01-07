const MessageModel=require ('../models/messageModel')


const addMessage =async(req,res)=>{
   const {chatId,senderId,text}=req.body
   try{
       const message=await new MessageModel({
        chatId,
        senderId,
        text
       })

       const result=await message.save()
       return res.status(200).json(result)
   }catch(error){
    console.log(error,'addMessage error');
   }
}

const getMessage =async(req,res)=>{
     
    const {chatId}=req.params
    try{
      const result= await MessageModel.find({chatId})
      return res.status(200).json(result)
    }catch(error){
        console.log(error,'getMessage');
    }


}

module.exports={
    addMessage,
    getMessage
}