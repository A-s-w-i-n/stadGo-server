import { notification } from "../../../domain/models/notification";
import { notificationRepository } from "../../../infra/repositories/notificationRepository";

export const updateNotificationStatus = (notificationRepo : notificationRepository)=>async(ownerId:string,Id : string)=>{
    const update   = await notificationRepo.updateNotification(ownerId,Id)
    return update ? update : null
}
export const UserupdateNotification = (notificationRepo : notificationRepository)=>async(ownerId:string,userId : string)=>{
    const update = await notificationRepo.UserupdateNotification(ownerId,userId)

    return update ? update : null
}