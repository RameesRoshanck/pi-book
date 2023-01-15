const MessageModel=require ('../models/messageModel')


const addMessage =async(req,res)=>{
    console.log(req.body.text,'==================================================');
   const {chatId,senderId,text}=req.body
   try{
       const message=new MessageModel({   
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
      console.log(result,'result');
      return res.status(200).json(result)
    }catch(error){
        console.log(error,'getMessage');
    }


}

module.exports={
    addMessage,
    getMessage
}