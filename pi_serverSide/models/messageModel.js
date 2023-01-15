const Mongoose=require ('mongoose')


const messageSchema=new Mongoose.Schema({
 chatId:{
    type:String
 },
 senderId:{
    type:String
 },
 text:{
    type:String
 },
 createdAt:{
    type:Date,
    default:Date.now()
},
updatedAt:{
    type:Date,
    default:Date.now()
}
}
// ,
// {
//     timeStamp:true,
// }
)

module.exports=Mongoose.model('message',messageSchema)