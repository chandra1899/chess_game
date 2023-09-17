const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io/"], // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

    io.on("connection",async  (socket) => {
    console.log("A user connected:", socket.id);
    
    socket.on('joinRoom', async (roomName,email) => {
      if(!email) return ;
      
      await socket.join(roomName);
      console.log('room and email',roomName,email);
    // console.log(`User joined room: ${roomName}`);
  });

  socket.on("send_msg", (data) => {
    console.log(data, "DATA");
    //This will send a message to a specific room ID
    socket.to(data.roomId).emit("receive_msg", data);
  });

  await socket.on("move", async (data) => {
    console.log("data",data);
   
    if(data.roomId){
      await io.to(data.roomId).emit("moved",data);
    }
    
    // socket.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});