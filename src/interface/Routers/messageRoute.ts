import { Router } from "express";
import {
  findMessageByChatId,
  sendMessage,
} from "../Controllers/chatController";

export const messageRouter = Router();

messageRouter.post("/send", sendMessage);
messageRouter.get("/:chatId", findMessageByChatId);
