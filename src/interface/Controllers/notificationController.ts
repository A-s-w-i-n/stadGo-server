import { Request,Response } from "express";
import { notificationModel } from "../../infra/database/notificationModel";
import {notificationRepositoryImpl } from "../../infra/repositories/notificationRepository";
import { createNotification } from "../../app/usecases/notification/createNotification";
import { ownerFindNotification, userFindNotification } from "../../app/usecases/notification/findNotification";
import { UserupdateNotification, updateNotificationStatus } from "../../app/usecases/notification/updateNotification";
import { responseEncoding } from "axios";

const db = notificationModel

const notificationRepo =notificationRepositoryImpl(db)

export const createNotifications = async(req : Request,res : Response)=>{
    const {userId,ownerId,username,stadiumid} = req.body


    const request = false
    

    try {
        const create = createNotification(notificationRepo)(userId,ownerId,stadiumid,username,request)
        res.status(200).json({message : "notification created",create})
    } catch (error) {
        res.json(500).json({message : "internal server"})
    }
}
export const findOnwerNotifications = async(req: Request,res:Response)=>{
    const {ownerId,stadiumId} = req.body
    try {
        
        const findNotification =await ownerFindNotification(notificationRepo)(ownerId,stadiumId)
        
        res.status(200).json({message : "notification fetched succesfull",findNotification})
    } catch (error) {
        res.status(500).json({error  : "internal server error"})
    }
}
export const updateStatus = async (req : Request,res : Response)=>{
    const {ownerId,Id} = req.body
    console.log(req.body,"ppp");
    
    
    try {
        const update = await updateNotificationStatus(notificationRepo)(ownerId,Id)

        res.status(200).json({message : "update successfull ",update})
    } catch (error) {
        res.status(500).json({error : "internal server error"})
    }
}
export const UserupdateStatus = async (req : Request,res : Response)=>{
    const {ownerId,userId} = req.body
    console.log(req.body,"ppp");
    
    
    try {
        const update = await UserupdateNotification(notificationRepo)(ownerId,userId)

        res.status(200).json({message : "update successfull ",update})
    } catch (error) {
        res.status(500).json({error : "internal server error"})
    }
}


export const findUserNotification = async (req : Request,res: Response)=>{
    const {ownerId,stadiumid,userId} = req.body
    console.log(req.body,"aaaa");
    

    try {
        const find = await userFindNotification(notificationRepo)(ownerId,stadiumid,userId)

        res.status(200).json({message : "notification find succesfull",find})
    } catch (error) {
        res.status(500).json({error : "internal server error"})
        
    }
}