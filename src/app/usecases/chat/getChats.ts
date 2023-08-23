import { chatRespository } from "../../../infra/repositories/chatRepository";

export const getChats =
  (chatRepo: chatRespository) => async (userId: string) => {
    const chats = await chatRepo.getAllUserChat(userId);
    return chats;
  };
