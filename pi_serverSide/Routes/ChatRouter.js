const express=require ("express")
const { createChat, userChat, findchat } = require("../chatController/chatController")
const { addMessage, getMessage } = require("../chatController/messageController")
const router=express.Router()

/* ------------------------------ //chat router ----------------------------- */
router.post("/",createChat)
router.get("/:userId",userChat)
router.get("/find/:firstId/:secondId",findchat)



/* ---------------------------- //message router ---------------------------- */
router.post('/message',addMessage)
router.get("/message/:chatId",getMessage)



module.exports=router