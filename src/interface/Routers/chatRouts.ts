import { Router } from "express";
import {
  accessChat,
  checkChatExist,
  fetchOwnerChat,
  fetchUserChat,
} from "../Controllers/chatController";
import userVerifyToken from "../Middleware/userAuth";

export const chatRouter = Router();

chatRouter.post("/accessChat", accessChat);
chatRouter.get("/userChat/:userId", fetchUserChat);
chatRouter.get("/ownerChat/:ownerId", fetchOwnerChat);
chatRouter.post('/charRoomExist',checkChatExist)
