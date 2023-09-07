import mongoose from "mongoose";
import { Chat } from "../../domain/models/chat";
import { User } from "../../domain/models/user";
import { MongoDBChat, chatModel } from "../../infra/database/chatModel";
import { ObjectId } from "bson";

export type chatRespository = {
  createChat: (userId: string, ownerid: string) => Promise<Chat[] | null>;
  getAllUserChat: (userId: string) => Promise<Chat | Chat[] | null>;
  getAllOwnersChat: (ownerId: string) => Promise<Chat | Chat[] | null>;
  chatRoomExist: (userId: string, ownerid: string) => Promise<Chat | null>;
};

export const chatRepositoryImpl = (chatModel: MongoDBChat): chatRespository => {
  const createChat = async (
    userId: string,
    ownerid: string
  ): Promise<Chat[] | null> => {
    try {
      const userid = new mongoose.Types.ObjectId(userId);
      const ownerId = new mongoose.Types.ObjectId(ownerid);
      const isChat = await chatModel
        .find({ $and: [{ User: userid }, { Owner: ownerId }] })
        .populate("User", "-password")
        .populate("Owner", "-password")
        .populate("latestMessage");

      if (isChat.length > 0) {
        return isChat;
      } else {
        const chatData: Chat = {
          chatName: "sender",
          User: userid,
          Owner: ownerId,
        };

        const createdChat = await chatModel.create(chatData);
        const fullChat = await chatModel
          .find({ _id: createdChat._id })
          .populate("User")
          .populate("Owner");

          console.log(fullChat);
          
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

      const chats = chatModel
        .find({ User: userid })
        .populate("Owner")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

      return chats;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const getAllOwnersChat = async (ownerId: string): Promise<Chat[] | null> => {
    try {
      const ownerid = new mongoose.Types.ObjectId(ownerId);

      const chats = await chatModel
        .find({ Owner: ownerid })
        .populate("User", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

      return chats;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const chatRoomExist = async (
    userId: string,
    ownerid: string
  ): Promise<Chat | null> => {
    const userid = new ObjectId(userId);
    const ownerId = new ObjectId(ownerid);
    const chatExist = await chatModel.findOne({
      $and: [{ User: userid }, { Owner: ownerId }],
    });
    console.log(chatExist);

    return chatExist ? chatExist : null;
  };

  return {
    createChat,
    getAllUserChat,
    getAllOwnersChat,
    chatRoomExist,
  };
};
