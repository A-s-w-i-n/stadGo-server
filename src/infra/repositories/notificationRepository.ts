import { ObjectId } from "bson";
import { notification } from "../../domain/models/notification";
import { updateRes } from "../../domain/models/update";
import { MongoDBNotification } from "../database/notificationModel";
// import mongoose from "mongoose";

export type notificationRepository = {
    createNotification : (notification : notification) => Promise<notification | null>
    updateNotification : (ownerId : string,Id : string) => Promise<notification | null | updateRes>
    findOwnerNotification : (ownerId  : string,stadiumId : string) =>Promise<notification[]| null>
    findUserNotifications : (ownerId : string,stadiumId : string,userId : string) =>Promise<notification | null>

}

export const notificationRepositoryImpl = (notificationModel : MongoDBNotification) : notificationRepository => {
    const createNotification = async (notification : notification) : Promise<notification>=>{
        const create= await notificationModel.create(notification)
        return create
    }
    const updateNotification = async (ownerId: string,Id : string)  : Promise<notification | null | updateRes>=>{
        
        const id =new ObjectId(Id)
        console.log(ownerId,"hhh",Id);
        
        const update = await notificationModel.findOneAndUpdate({$and: [{ ownerId: ownerId, }, { _id: id }]},{$set : {request : true}})
        console.log(update,"log");
    return update ? update : null
    }
    const findOwnerNotification = async (ownerId :string,stadiumId : string) : Promise<notification[] | null>=>{
        const ownerid =new ObjectId(ownerId)
        const stadiumid =new ObjectId(stadiumId)
        const find = await notificationModel.find({$and : [{stadiumid : stadiumid },{ownerId : ownerid}]}) 
        return find ? find : null
    }
    const findUserNotifications = async (ownerId : string,stadiumId : string,userId : string):Promise<notification| null>=>{

        const find = await notificationModel.findOne({$and:[{ownerId : ownerId},{stadiumid :stadiumId},{userId : userId}]})

    
            return find ? find : null
        

    }
    return {
        createNotification,
        updateNotification,
        findOwnerNotification,
        findUserNotifications
    }
}
