const io = require('socket.io')(8800,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let activeUsers=[]

io.on('connection', (socket) => {
    socket.on('new-user-data',(newUserId) => {
        if(!activeUsers.some((user)=>user.userId === newUserId)){
             
            activeUsers.push({
                userId:newUserId,
                socketId:socket.id
            })
        }
        console.log('user is connected',activeUsers);
        io.emit('get-users',activeUsers);
    });

    //send message
    socket.on('send-message',(data)=>{
        const {receverId} = data
        const user=activeUsers.find((user)=>user.userId === receverId)
        console.log("sending from socket to:",receverId);
        console.log(data,'Data');
        if(user){
            io.to(user.socketId).emit("receive message",data)
        }
    })

    socket.on('disconnected',()=>{
        activeUsers = activeUsers.filter((user)=>{user.socketId !==socket.id})
        console.log('user is disconneted',activeUsers);
        io.emit('get-users',activeUsers);
    })


  });