const Mongoose=require("mongoose")


const chatSchema=new Mongoose.Schema({
    members:{
        type:Array
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
},
{
    timeStamp:true
}
)

module.exports=Mongoose.model("chat",chatSchema)