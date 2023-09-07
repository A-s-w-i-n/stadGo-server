import { chatRespository } from "../../../infra/repositories/chatRepository";

export const chatExist = (chatRepo : chatRespository)=>async(userId : string,ownerid : string)=>{
    const exist  = await chatRepo.chatRoomExist(userId,ownerid)

    return exist ? exist : null
}