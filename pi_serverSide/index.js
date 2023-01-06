require('dotenv').config()
const express=require ('express')
const app=express()
var cors = require('cors')
const connectDB=require ('./config/confing')
const Router=require ('./Routes/Routes')
var cookieParser = require('cookie-parser')
const path=require('path')




app.use(cors())
app.use(cookieParser()) 
app.use("/images",express.static(path.join(__dirname,"public/images")))

const PORT=process.env.PORT

connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/',Router)

app.listen(PORT,()=>{
    console.log('server start');
})