const express=require ('express')
const { addPost, updatePost, deletePost, likePost, getPost, getTimeLine, getAllPost, addComment, getComment } = require('../controllers/postController')
const {login, Signup, resetpass, getReset,verifyOtp } = require('../controllers/authController')
const router=express.Router()
const multer = require("multer");
const { getSingleUser, followUser, unFollowUser,allUsers, getFriends, getAUser, updateUser, deleteAccount, getSingleUserName, descUpdate, unFollowersList, searchUser } = require('../controllers/userController')
const verifyToken=require ("../Middleware/authMiddleware");
const { getComments } = require('../controllers/commentController');
// const { addComment, getComment } = require('../controllers/commentController');


var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'public/images');    
    }, 
    filename: function (req, file, cb) { 
       cb(null,file.originalname);   
    
    }
 });

//multer use
const upload=multer({storage:storage})






/* ------------------------------ //auth routes ----------------------------- */
//user signup
router.post('/Signup',Signup)
//user login
router.post('/login',login)
//user reset
router.post('/reset',resetpass)
//user reset new password
router.post('/resetNew',getReset)
//user email verification in otp
router.post('/verifyotp',verifyOtp)




/* ------------------------ //userControllers routes ------------------------ */
//update user
router.put('/:id',updateUser)
//delete user account
router.delete('/:id',deleteAccount)
//get single user
router.get('/',getSingleUser)
//get single user
router.get('/getSingleUserName/:id',getSingleUserName)
//get  all users
router.get('/allUsers',allUsers)
//get all friends
router.get('/getFriends/:username',getFriends)
//follow
router.put("/followUser/:id/follow",followUser)
//unfollow
router.put("/unfollowUser/:id/unfollow",unFollowUser)
//get a user with params id
router.get("/getAuser/:id",getAUser)
//user description and profile photo
router.post('/descUpdate/:id', descUpdate)

router.put("/uploadProfilePicture",upload.single("file"),(req,res)=>{
    try{
        // console.log(req.body,'+++++++++');
         return res.status(200).json({message:"successfully upload image"})
    }catch(error){
        console.log(error,'upload image');
    }
})


//user get unfollowers list
router.get("/unFollowersList/:id",unFollowersList)

//search user
router.post("/searchUser/:searching",searchUser)


/* ------------------------------ //post router -------------------------------- */





router.put("/upload",upload.array("file",1),(req,res)=>{
    try{
        // console.log(req.body,'+++++++++');
         return res.status(200).json({message:"successfully upload image"})
    }catch(error){
        console.log(error,'upload image');
    }
})





//create a post
router.put("/addpost",addPost)
//update a post
router.put("/updatePost/:id",updatePost)
//delete a post
router.delete("/deletePost/:id",deletePost)
//like & unlike a post
router.put("/userlike/:id/like",likePost)
//get a post
router.get("/getPost/:id",getPost)
// get time line of post
router.get("/getTimeline/:userId",getTimeLine)
//get user all post
router.get("/profile/:username",getAllPost)
// add post comment
router.put('/addComment/:id',addComment)
//get comment
router.get("/getComment/:id",getComment)




/* ----------------------------- //comment route ---------------------------- */

// //add comment
// router.post('/addComment/:id',addComment)
// //get comment
router.get("/getComments/:id",getComments)




module.exports=router