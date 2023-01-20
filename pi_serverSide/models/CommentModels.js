const Mongoose=require ('mongoose')
const User=require ('../models/user');

const CommentSchema=new Mongoose.Schema({
    desc:{
        type:String
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        ref:User
    },
     createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=Mongoose.model("comment",CommentSchema)