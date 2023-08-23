import express from "express";
import dotenv from "dotenv";
import { db } from "./src/infra/database/config";
import userRouter from "./src/interface/Routers/userRouter";
import ownerRouter from "./src/interface/Routers/owerRouter";
import adminRouter from "./src/interface/Routers/adminRoute";
import orgRouter from "./src/interface/Routers/organizationRoute";
import stadiumRouter from "./src/interface/Routers/StadiumRoute";
import stadiumFetchRouter from "./src/interface/Routers/StadiumRoute";
import { chatRouter } from "./src/interface/Routers/chatRouts";
import { messageRouter } from "./src/interface/Routers/messageRoute";
import { newMessageReceived } from "./src/domain/models/chat";

const cors = require("cors");

const app = express();

db();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/", userRouter);
app.use("/owner", ownerRouter);
app.use("/admin", adminRouter);
app.use("/org", orgRouter);
app.use("/stadium", stadiumRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

const server = app.listen(3000, () => {
  console.log("server running");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection",(socket: any)=>{
  console.log("socket io connected ");

  socket.on("setup",(userId : string)=>{
    socket.join(userId)

    socket.emit("connected")
  })

  socket.on('join-chat',(room : string)=>{
    socket.join(room)
    console.log("user joind to room :",room);
  })
  socket.on('new messages',(newMessageReceived : newMessageReceived)=>{
    console.log(newMessageReceived ,"getting");

    let chat  =newMessageReceived.chat
    console.log(newMessageReceived,"new message");

    const  sender = newMessageReceived.User ? newMessageReceived.User : newMessageReceived.Owner
    console.log("sender",sender);
    console.log("newMessageReceived in user",newMessageReceived.chat.User);
    
    if(sender?._id ===newMessageReceived.chat.User._id){
      console.log("user is the sender");
      socket.in(chat.Owner._id).emit('message Received',newMessageReceived)
    }
    if(sender?._id === newMessageReceived.chat.Owner._id){
      console.log("owner is the sender");
      socket.in(chat.User._id).emit("message Received",newMessageReceived)
    }
    if(chat._id ===newMessageReceived.User?._id) return console.log("not a dumb");
    socket.in(chat.User?._id).emit("new message received",newMessageReceived)

    if(chat._id === newMessageReceived.Owner?._id) return console.log("dumb ");
    socket.in(chat.User?._id).emit('message received')
  })
  
})

