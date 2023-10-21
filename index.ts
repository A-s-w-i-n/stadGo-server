import express from "express";
import dotenv from "dotenv";
import { db } from "./src/infra/database/config";
import userRouter from "./src/interface/Routers/userRouter";
import notificationRouter from "./src/interface/Routers/notificationRoute";
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
    origin: ["http://localhost:3000","https://stadgo-client-side.vercel.app","http://13.53.117.242/"],
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
app.use("/notification",notificationRouter)


const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log("server running");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000","https://stadgo-client-side.vercel.app"],
  },
});

io.on("connection",(socket: any)=>{
  console.log("socket io connected ");

  socket.on("setup",(userId : string)=>{
    console.log(userId,"userid");
    
    socket.join(userId)
    socket.emit("connected")
  })

  socket.on('join-chat',(room : string)=>{
    socket.join(room)
    console.log("user joind to room :",room);
  })
  socket.on('newMessage',(newMessageReceived : newMessageReceived)=>{
    console.log(newMessageReceived ,"getting");

    let chat  =newMessageReceived.chat  
    console.log(newMessageReceived,"new message");
    console.log("chattttttttttttttttttttttttttttttttttttttttttttttt",chat);
    

    const  sender = newMessageReceived.User ? newMessageReceived.User : newMessageReceived.Owner
    console.log("sender",sender);
    console.log("newMessageReceived ===========",newMessageReceived);
    console.log(newMessageReceived.chat,"ppp");
    
    if(sender?._id === newMessageReceived.chat.User?._id){
      console.log("user is the sender");
      console.log('fssfdddgddlllllllllllllllllllllllllllllllllllllllllllll=',chat.Owner?._id);
      
      socket.in(chat.Owner?._id).emit('message Received',newMessageReceived)
    }
    if(sender?._id === newMessageReceived.chat.Owner?._id){
      console.log("owner is the sender");
      console.log('Ownrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr=',chat.User?._id);
      socket.in(chat.User?._id).emit("message Received",newMessageReceived)
    }
    if(chat._id === newMessageReceived.User?._id) return console.log("not a dumb");
    socket.in(chat.User?._id).emit("message Received",newMessageReceived)

    if(chat._id === newMessageReceived.Owner?._id) return console.log("dumb "); 
    socket.in(chat.Owner?._id).emit('message Received',newMessageReceived)
  })
  
})


