const express=require ('express')
const { addPost, updatePost, deletePost, likePost, getPost, getTimeLine, getAllPost } = require('../controllers/postController')
const {login, Signup, resetpass, getReset,verifyOtp } = require('../controllers/authController')
const router=express.Router()
const multer = require("multer");
const { getSingleUser, followUser, unFollowUser,allUsers, getFriends, getAUser } = require('../controllers/userController')



/* ------------------------------ //auth routes ----------------------------- */
//user signup
router.post('/Signup',Signup)
//user login
router.post('/',login)
//user reset
router.post('/reset',resetpass)
//user reset new password
router.post('/resetNew',getReset)
//user email verification in otp
router.post('/verifyotp',verifyOtp)




/* ------------------------ //userControllers routes ------------------------ */

//get single user
router.get('/singleUser',getSingleUser)
//get  all users
router.get('/allUsers',allUsers)
//get all friends
router.get('/getFriends/:id',getFriends)
//follow
router.put("/followUser/:id/follow",followUser)
//unfollow
router.put("/unfollowUser/:id/unfollow",unFollowUser)
//get a user with params id
router.get("/getAuser/:id",getAUser)




/* ------------------------------ //post router -------------------------------- */



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
router.post("/upload",upload.array("file",1),(req,res)=>{
    try{
        console.log(req.body);
         return res.status(200).json({message:"successfully upload image"})
    }catch(error){
        console.log(error,'upload image');
    }
})


//create a post
router.post("/addpost",addPost)
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



module.exports=router