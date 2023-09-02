import { chatRespository } from "../../../infra/repositories/chatRepository";

export const getOwnerChats =
  (chatRepo: chatRespository) => async (ownerId: string) => {
    const chats = await chatRepo.getAllOwnersChat(ownerId);
    return chats;
  };
