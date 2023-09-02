import { messageRepository } from "../../../infra/repositories/messageRepository";
export const getAllMessage =
  (messageRepo: messageRepository) => async (chatId: string) => {
    const message = await messageRepo.findMessageByChatId(chatId);

    return message;
  };
