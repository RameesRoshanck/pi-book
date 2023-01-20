const Mongoose=require('mongoose')
const User=require ('../models/user');
let objectId=require("mongodb").ObjectId



const postSchema=new Mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    img:{
        type:Array,
        default:"" 
    },
    video:{
        type:Array,
        default:"" 
    },
    like:{
        type:Array,
        default:[]
    },
    report:{
        type:Array,
        default:[]
    },
    reportStatus:{
        type:String,
        default:'false'
    },
    userId:{
        type:String,
        required:true,
        ref:User
    },
     createdAt:{
        type:Date,
        default:Date.now()
    },
    comments:[
        {
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

        }
    ]
})

module.exports=Mongoose.model("post",postSchema)