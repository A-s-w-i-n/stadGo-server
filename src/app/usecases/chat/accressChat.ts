import { chatRespository } from "../../../infra/repositories/chatRepository";

export const chatAccess =
  (chatRepo: chatRespository) => async (userId: string, ownerId: string) => {
    const chat = await chatRepo.createChat(userId, ownerId);

    return chat ? chat : null;
  };
