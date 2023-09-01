import mongoose from "mongoose";
import { Chat } from "../../domain/models/chat";
import { User } from "../../domain/models/user";
import { MongoDBChat, chatModel } from "../../infra/database/chatModel";

export type chatRespository = {
  createChat: (userId: string, ownerId: string) => Promise<Chat[] | null>;
  getAllUserChat: (userId: string) => Promise<Chat | Chat[] | null>;
  getAllOwnersChat: (ownerId: string) => Promise<Chat | Chat[] | null>;
};

export const chatRepositoryImpl = (chatModel: MongoDBChat): chatRespository => {
  const createChat = async (
    userId: string,
    ownerId: string
  ): Promise<Chat[] | null> => {
    try {
      const userid = new mongoose.Types.ObjectId(userId);
      const ownerid = new mongoose.Types.ObjectId(ownerId);
      const isChat = await chatModel
        .find({ $and: [{ User: userid }, { Owner: ownerid }] })
        .populate("User", "-password")
        .populate("Owner", "-password")
        .populate("latestMessage");

      if (isChat.length > 0) {
        return isChat;
      } else {
        const chatData: Chat = {
          chatName: "sender",
          User: userid,
          Owner: ownerid,
        };

        const createdChat = await chatModel.create(chatData);
        const fullChat = await chatModel.find({ _id: createdChat._id })
        .populate("User").populate("Owner")
        return fullChat;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const getAllUserChat = async (userId: string): Promise<Chat[] | null> => {
    try {
      const userid = new mongoose.Types.ObjectId(userId);

      const chats = chatModel.find({ User: userid })
      .populate("Owner").populate("latestMessage").sort({updatedAt : -1})

      return chats;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getAllOwnersChat = async (ownerId: string): Promise<Chat[] | null> => {
    try {
      const ownerid = new mongoose.Types.ObjectId(ownerId);

      const chats = await chatModel.find({ Owner: ownerid })
      .populate("User","-password").populate("latestMessage").sort({updatedAt : -1})

      return chats;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return {
    createChat,
    getAllUserChat,
    getAllOwnersChat,
  };
};
