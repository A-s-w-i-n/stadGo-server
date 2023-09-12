import { notification } from "../../../domain/models/notification";
import { notificationRepository } from "../../../infra/repositories/notificationRepository";

export const ownerFindNotification = (notificationRepo  : notificationRepository)=>async(ownerId : string,stadiumId : string) =>{
    const findOwnerNotifications : notification[] | null  = await notificationRepo.findOwnerNotification(ownerId,stadiumId)
    return findOwnerNotifications ? findOwnerNotifications : null
}
export const userFindNotification = (notificationRepo : notificationRepository)=>async(ownerId : string,stadiumId : string,userId : string)=>{
    const findUserNotification : notification | null  = await notificationRepo.findUserNotifications(ownerId,stadiumId,userId)

    return findUserNotification ? findUserNotification : null
}