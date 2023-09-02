import { Router } from "express";
import {
  accessChat,
  fetchOwnerChat,
  fetchUserChat,
} from "../Controllers/chatController";

export const chatRouter = Router();

chatRouter.post("/accessChat", accessChat);
chatRouter.get("/userChat/:userId", fetchUserChat);
chatRouter.get("/ownerChat/:ownerId", fetchOwnerChat);
