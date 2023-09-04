import { chatRespository } from "../../../infra/repositories/chatRepository";

export const chatExist = (chatRepo : chatRespository)=>async(userId : string,ownerId : string)=>{
    const exist = await chatRepo.chatRoomExist(userId,ownerId)

    return exist ? exist : null
}