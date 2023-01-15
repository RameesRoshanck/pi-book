const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:3000",
  },
});



let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
            userId: newUserId,
            socketId: socket.id,
        });
        }
        // console.log("user is connected", activeUsers);
        io.emit("get-users", activeUsers);
    });


    socket.on("disconnected", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) =>user.socketId !== socket.id);
        console.log("user is disconneted", activeUsers);
        io.emit("get-users", activeUsers);
    });




    //send message
    socket.on("send-messages", (data) => {
        const { recieverId } = data;
        console.log(activeUsers,'aaaaaaaaaaaaaaaaaaaaaaaa');
        const user = activeUsers.find((user) => user.userId === recieverId);
        console.log("sending from socket to:", recieverId);
        // console.log(data, "Data");
        console.log(user,'/////////////////////////////');
        if (user) {
        io.to(user.socketId).emit("recieve-message", data); 
        }
    })

    });




 
