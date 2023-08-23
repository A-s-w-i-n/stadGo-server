import { messageRepository } from "../../../infra/repositories/messageRepository";
export const ownerSendMessage =
  (messageRepo: messageRepository) =>
  async (content: string, chatId: string, owner: string) => {
    const message = await messageRepo.ownerSendMessage(content, chatId, owner);

    return message;
  };
