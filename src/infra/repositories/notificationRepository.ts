import { notification } from "../../domain/models/notification";
import { updateRes } from "../../domain/models/update";
import { MongoDBNotification } from "../database/notificationModel";

export type notificationRepository = {
    createNotification : (notification : notification) => Promise<notification | null>
    updateNotification : (userId : string,id : string) => Promise<notification | null | updateRes>
    findNotification : (userId : string,ownerId  : string,stadiumId : string) =>Promise<notification[]| null>

}

export const notificationRepositoryImpl = (notificationModel : MongoDBNotification) : notificationRepository => {
    const createNotification = async (notification : notification) : Promise<notification>=>{
        const create= await notificationModel.create(notification)
        return create
    }
    const updateNotification = async (id : string,userid : string)  : Promise<notification | null | updateRes>=>{
        const update = await notificationModel.updateOne({$and: [{ userId: userid, }, { _id: id }]},{$set : {request : true}})
    return update ? update : null
    }
    const findNotification = async (ownerId :string,userId : string,stadiumId : string) : Promise<notification[] | null>=>{
        const find = await notificationModel.find({$or : [{userId :userId,stadiumId : stadiumId },{ownerId : ownerId}]})    
        return find ? find :null
    }

    return {
        createNotification,
        updateNotification,
        findNotification
    }
}
