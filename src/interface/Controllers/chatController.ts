import {
  chatRespository,
  chatRepositoryImpl,
} from "../../infra/repositories/chatRepository";
import { Request, Response } from "express";
import { chatModel } from "../../infra/database/chatModel";
import { chatAccess } from "../../app/usecases/chat/accressChat";
import { messageModel } from "../../infra/database/messageModel";
import { getChats } from "../../app/usecases/chat/getChats";
import { getOwnerChats } from "../../app/usecases/chat/getOwnerChats";
import { messageRepositoryImpl } from "../../infra/repositories/messageRepository";
import { sendingMessage } from "../../app/usecases/chat/sendMessage";
import { ownerSendMessage } from "../../app/usecases/chat/ownerSendMessage";
import { getAllMessage } from "../../app/usecases/chat/getMessage";
import { chatExist } from "../../app/usecases/chat/chatRoomexist";

const chatDB = chatModel;
const chatRepository = chatRepositoryImpl(chatDB);

const messageDB = messageModel;
const messageRepository = messageRepositoryImpl(messageDB);

//  const messageRepository =

export const accessChat = async (req: Request, res: Response) => {
  try {
    const { userId, ownerid } = req.body;
    
      const isChat = await chatAccess(chatRepository)(userId, ownerid);

      res.status(200).json({ success: "success", isChat });
    
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const fetchUserChat = async (req: Request, res: Response) => {
  try {
    const userid = req.params.userId;

    const allChats = await getChats(chatRepository)(userid);
    

    res.json({ message: " student chat fetch success", allChats });
  } catch (error) {
    res.status(500).json({ error: "internal sever error" });
  }
};

export const fetchOwnerChat = async (req: Request, res: Response) => {
  try {
    
    const ownerid = req.params.ownerId;


    const allChats = await getOwnerChats(chatRepository)(ownerid);

    res.json({ message: "owner chat  fetch success", allChats });
  } catch (error) {
    res.json(500).json({ error: "internal server error" });
  }
};
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { content, chatId, currentId, currentRole } = req.body;

    if (currentRole === "user") {
      const user = currentId;
      const msg = await sendingMessage(messageRepository)(
        content,
        chatId,
        user
      );
      
      res.status(200).json({ message: "successs", msg });
    } else {
      const owner = currentId;
      const msg = await ownerSendMessage(messageRepository)(
        content,
        chatId,
        owner
      );
      res.status(200).json({ message: "success", msg });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
}; 
export const findMessageByChatId = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId;

    const messages = await getAllMessage(messageRepository)(chatId);

    
    res.status(200).json({ message: "success", messages });
  } catch (error) {
    res.status(500).json({ error: " internal server error" });
  }
};
export const  checkChatExist = async (req : Request , res : Response)=>{
  try {
    const {userId,ownerid} = req.body

    const exist = await chatExist(chatRepository)(userId,ownerid)
    
    res.status(200).json({messgage : "chat room find success",exist})
  } catch (error) {
    res.status(500).json({error : "internal server error"})
    
  }
}
