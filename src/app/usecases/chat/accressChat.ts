import { chatRespository } from "../../../infra/repositories/chatRepository";

export const chatAccess =
  (chatRepo: chatRespository) => async (userId: string, ownerid: string) => {
    const chat = await chatRepo.createChat(userId, ownerid);
    
    return chat ? chat : null;
  };
