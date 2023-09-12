import { notification } from "../../../domain/models/notification";
import { notificationRepository } from "../../../infra/repositories/notificationRepository";

export const createNotification = (notificationRepo : notificationRepository)=>async(userId: string,ownerId  : string,stadiumid : string,username : string,request :boolean): Promise<notification | null> =>{
    const notification : notification = {
        userId, ownerId, stadiumid, username,request
    }
    const create : notification | null = await notificationRepo.createNotification(notification)

        return create 
    
}