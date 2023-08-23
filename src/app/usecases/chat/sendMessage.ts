import { messageRepository } from "../../../infra/repositories/messageRepository";
export const sendingMessage =
  (messageRepo: messageRepository) =>
  async (content: string, chatId: string, user: string) => {
    const message = await messageRepo.sendMessage(content, chatId, user);
    return message;
  };
