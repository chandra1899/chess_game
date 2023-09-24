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

    io.on("connection",async  (socket:any) => {
    console.log("A user connected:", socket.id);
    await socket.on('joinRoom', async (roomName:any,email:any) => {
      if(!email) return ;
      socket.email=email;
      socket.roomName=roomName
      await socket.join(roomName);
      console.log('room and email',roomName,email);
      // update disconnect
    //   await fetch('http://localhost:3000/api/setdisconnected',{
    //   method:'POST',
    //   headers:{
    //     'Access-Control-Allow-Origin': '*',
    //     Accept:"application/json",
    //     "Content-Type":"application/json"
    //   },
    //   credentials:'include',
    //   body:JSON.stringify({
    //     email:socket.email,
    //     roomName:socket.roomName
    //   })
    // })
    // console.log(`User joined room: ${roomName}`);
  });

  await socket.on("send_msg", async (data:any) => {
    console.log(data, "DATA");
    if(data.roomId){
      await io.to(data.roomId).emit("receive_msg", data);
    }
  });

  await socket.on("move", async (data:any) => {
    console.log("data",data);
   
    if(data.roomId){
      await io.to(data.roomId).emit("moved",data);
    }
    
    // socket.to(data.roomId).emit("receive_msg", data);
  });

  await socket.on("receive_draw_req", async (email:any,roomName:any) => {
    console.log("email",email);
      await io.to(roomName).emit("receive_draw_req",email);    
  });

  await socket.on("game_over", async (roomName:any,email:any) => {
    console.log("email",email);
      await io.to(roomName).emit("game_over",email);  
  });

  await socket.on("draw_accepted", async (email:any,roomName:any) => {
    console.log("email",email);
      await io.to(roomName).emit("draw_accepted",email);    
  });

  socket.on('disconnect', async function () {
    // let disconnectionMessage = socket.email + " Disconnected from Socket and room " + socket.roomName;
    let res=await fetch('http://localhost:3000/api/setdisconnected',{
      method:'POST',
      headers:{
        'Access-Control-Allow-Origin': '*',
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:'include',
      body:JSON.stringify({
        email:socket.email,
        roomName:socket.roomName
      })
    })
    console.log('status',res.status,res);
  });
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});