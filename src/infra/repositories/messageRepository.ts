import { User } from "../../domain/models/user";
import mongoose from "mongoose";
import { messageModel, MongoDBMessage } from "../database/messageModel";
import { message } from "../../domain/models/chat";
import { chatModel } from "../database/chatModel";

export type messageRepository = {sendMessage: (content: string,chatId: string,user: string) => Promise<message>;ownerSendMessage: (content: string,chatId: string,owner: string) => Promise<message>;
  findMessageByChatId: (chatId: string) => Promise<message[]>;
};

export const messageRepositoryImpl = (messageModel: MongoDBMessage): messageRepository => {
  const sendMessage = async (
    content: string,
    chatId: string,
    user: string
  ): Promise<message> => {
    const newChat: message = {
      User: new mongoose.Types.ObjectId(user),
      content,
      chat: new mongoose.Types.ObjectId(chatId),
    };
    console.log("message sending"); 
    
    let message = await messageModel.create(newChat);

    message = await message.populate('User','_id firstname lastname username ')
    message = await message.populate('Owner','_id firstname lastname ownername')
    message = await message.populate('chat')
    message = await message.populate('chat.User')
    message = await message.populate('chat.Owner')

    await chatModel.updateOne(
      { _id: new mongoose.Types.ObjectId(chatId) },
      { $set: { latestMessage: message } }
    );

    return message;
  };
  const ownerSendMessage = async (
    content: string,
    chatId: string,
    owner: string
  ): Promise<message> => {
    const newChat: message = {
      Owner: new mongoose.Types.ObjectId(owner),
      content,
      chat: new mongoose.Types.ObjectId(chatId),
    };
    let message = await messageModel.create(newChat);
    console.log(message, "jjjj");

    message = await message.populate('User','_id firstname lastname username ')
    message = await message.populate('Owner','_id firstname lastname ownername')
    message = await message.populate('chat')
    message = await message.populate('chat.User')
    message = await message.populate('chat.Owner')

    return message;
  };
  const findMessageByChatId = async (chatId: string): Promise<message[]> => {
    const message = await messageModel.find({
      chat: new mongoose.Types.ObjectId(chatId),
    }).
    populate('User','firstname lastname username').populate('Owner','firstname lastname ownername').populate('chat')

    return message;
  };

  return {
    sendMessage,
    ownerSendMessage,
    findMessageByChatId,
  };
};
